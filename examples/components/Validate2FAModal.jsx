import { validateOTP } from '@api/otp';
import { Button } from '@components';
import { Email, Input } from '@components/Fields';
import { useMutation } from '@hooks';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

const Verify2FAModal = ({ hide, isOpen }) => {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');

  const mutation = useMutation(validateOTP, {
    invalidateQueries: '/examples/profile',
  });

  const handleValidate = async () => {
    await mutation.mutateAsync({ email, token });
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
      <Modal.Body className="flex flex-col gap-4">
        <Email placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <Input placeholder="Authentication Code" onChange={(e) => setToken(e.target.value)} />
      </Modal.Body>

      <Modal.Footer>
        <Button className="button full secondary no-underline" onClick={hide}>
          Close
        </Button>
        <Button className="button full primary no-underline" onClick={handleValidate}>
          Validate
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Verify2FAModal;
