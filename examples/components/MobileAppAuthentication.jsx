import { generateOTP } from '@api/otp';
import { Button } from '@components';
import { useDisclosure, useMutation } from '@hooks';
import { useState } from 'react';
import { Setup2FAModal } from '.';

const MobileAppAuthentication = () => {
  const { hide, isOpen, show } = useDisclosure();
  const [otpData, setOtpData] = useState(null);

  const mutation = useMutation(generateOTP, {
    invalidateQueries: '/examples/profile',
    onSuccess: (data) => {
      setOtpData(data);
    },
  });

  const handleClick = async () => {
    await mutation.mutateAsync();
    show();
  };

  return (
    <div className="p-10 flex flex-col gap-5">
      <p>Secure your account with TOTP two-factor authentication.</p>
      <Button onClick={handleClick} className="button full primary no-underline">
        Setup 2FA
      </Button>

      {isOpen && <Setup2FAModal data={otpData} hide={hide} isOpen={isOpen} />}
    </div>
  );
};

export default MobileAppAuthentication;
