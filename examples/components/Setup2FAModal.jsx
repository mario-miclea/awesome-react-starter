import { verifyOTP } from '@api/otp';
import { Button } from '@components';
import { Input } from '@components/Fields';
import { useMutation } from '@hooks';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

const Setup2FAModal = ({ data, hide, isOpen }) => {
  const [token, setToken] = useState('');

  const mutation = useMutation(verifyOTP, {
    invalidateQueries: '/examples/profile',
  });

  const handleVerify = async () => {
    await mutation.mutateAsync(token);
  };

  return (
    <Modal
      backdrop="static"
      centered
      id="view-student-details-modal"
      keyboard={false}
      onHide={hide}
      show={isOpen}
    >
      <Modal.Header className="flex items-center justify-between">
        <Modal.Title>
          <h3 className="font-display text-lg">Two-Factor Authentication (2FA)</h3>
        </Modal.Title>
        <Button className="-mr-2 flex h-8 w-8 items-center justify-center p-2" onClick={hide}>
          <img src="/icons/xmark.svg" alt="close" />
        </Button>
      </Modal.Header>
      <Modal.Body className="px-10 flex flex-col gap-5">
        <div>
          <div className="border-b-2 mb-2">
            <h4 className="text-primary font-bold">Configuring Google Authenticator</h4>
          </div>
          <ol className="list-decimal">
            <li>Install Google Authenticator (IOS - Android).</li>
            <li>In the authenticator app, select "+" icon.</li>
            <li>
              Select "Scan a barcode (or QR code)" and use the phone's camera to scan this barcode.
            </li>
          </ol>
        </div>

        <div>
          <div className="border-b-2 mb-2">
            <h4 className="text-primary font-bold">Scan QR Code</h4>
          </div>
          <img src={data.imageUrl} alt="QR Code" />
        </div>

        <div>
          <div className="border-b-2 mb-2">
            <h4 className="text-primary font-bold">Or Enter Code Into Your App</h4>
          </div>
          <p>SecretKey: {data.secret}</p>
        </div>

        <div>
          <div className="border-b-2 mb-2">
            <h4 className="text-primary font-bold">Verify Code</h4>
          </div>
          <p>For changing the setting, please verify the authentication code: </p>
          <Input placeholder="Authentication Code" onChange={(e) => setToken(e.target.value)} />
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button className="button full secondary no-underline" onClick={hide}>
          Close
        </Button>
        <Button className="button full primary no-underline" onClick={handleVerify}>
          Verify
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Setup2FAModal;
