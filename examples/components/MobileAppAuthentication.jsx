import { disableOTP, generateOTP } from '@api/otp';
import { Button } from '@components';
import { useDisclosure, useMutation } from '@hooks';
import { useState } from 'react';
import { Setup2FAModal, Validate2FAModal } from '.';

const MobileAppAuthentication = () => {
  const { hide: hideSetupModal, isOpen: isSetupModalOpen, show: showSetupModal } = useDisclosure();
  const {
    hide: hideValidateModal,
    isOpen: isValidateModalOpen,
    show: showValidateModal,
  } = useDisclosure();

  const [otpData, setOtpData] = useState(null);

  const setupMutation = useMutation(generateOTP, {
    invalidateQueries: '/examples/profile',
    onSuccess: (data) => {
      setOtpData(data);
    },
  });

  const handleSetupClick = async () => {
    await setupMutation.mutateAsync();
    showSetupModal();
  };

  const disableMutation = useMutation(disableOTP, {
    invalidateQueries: '/examples/profile',
  });

  const handleDisableClick = async () => {
    await disableMutation.mutateAsync();
  };

  return (
    <div className="p-10 flex flex-col gap-5">
      <p>Secure your account with TOTP two-factor authentication.</p>
      <div className="flex gap-5">
        <Button onClick={handleSetupClick} className="button full primary no-underline">
          Setup 2FA
        </Button>
        <Button onClick={showValidateModal} className="button full primary no-underline">
          Validate 2FA
        </Button>
        <Button onClick={handleDisableClick} className="button full no-underline">
          Disable 2FA
        </Button>
      </div>

      {isSetupModalOpen && (
        <Setup2FAModal data={otpData} hide={hideSetupModal} isOpen={isSetupModalOpen} />
      )}

      {isValidateModalOpen && (
        <Validate2FAModal hide={hideValidateModal} isOpen={isValidateModalOpen} />
      )}
    </div>
  );
};

export default MobileAppAuthentication;
