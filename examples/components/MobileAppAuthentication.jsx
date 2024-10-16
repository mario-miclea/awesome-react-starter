import { generateOTP } from '@api/otp';
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

  const mutation = useMutation(generateOTP, {
    invalidateQueries: '/examples/profile',
    onSuccess: (data) => {
      setOtpData(data);
    },
  });

  const handleSetupClick = async () => {
    await mutation.mutateAsync();
    showSetupModal();
  };

  return (
    <div className="p-10 flex flex-col gap-5">
      <p>Secure your account with TOTP two-factor authentication.</p>
      <Button onClick={handleSetupClick} className="button full primary no-underline">
        Setup 2FA
      </Button>

      <Button onClick={showValidateModal} className="button full primary no-underline">
        Validate 2FA
      </Button>

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
