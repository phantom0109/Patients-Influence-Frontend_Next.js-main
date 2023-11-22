import React, { useState } from 'react';
import { useRouter } from 'next/router';

import { Stack } from 'components/system';
import { useSnackbar } from 'hooks';
import { useAppContext } from 'context';
import { AuthorizationAPI } from 'api';

import { Modal } from 'components/custom';
import { TChangePasswordModalProps } from 'features/account/role/ambasador/elements/change-password-modal/types';
import { ChangePasswordModalMain } from 'features/account/role/ambasador/elements/change-password-modal/styles';
import { Button, Input } from 'components/ui';

const ChangePasswordModal = ({
  onClose,
  ...props
}: TChangePasswordModalProps) => {
  const { user, logout } = useAppContext();
  const { push } = useSnackbar();
  const router = useRouter();

  const [state, setState] = useState({
    oldPassword: '',
    newPassword: '',
    repeatNewPassword: '',
  });

  const resetPassword = async () => {
    console.log('@@@@@@@@@@@@@###########', user);
    try {
      await AuthorizationAPI.changePassword(
        {
          user_id: user.id,
          email: user.email,
          oldpassword: state.oldPassword,
          newpassword: state.newPassword,
        },
        'en'
      ).then(() => {
        console.log('1111111111111111', user);
        logout();
        router.push('/login');
      });
      push('Your Password has been reset.', { variant: 'success' });
    } catch {
      console.log('2222222222222');
      push('Password reset request has not been sent.', { variant: 'error' });
    }
  };

  return (
    <Modal
      size="small"
      title="Do you want to change password?"
      actions={[
        <Button
          color="primary"
          variant="contained"
          size="large"
          onClick={resetPassword}
        >
          Change password
        </Button>,
      ]}
      onClose={onClose}
      {...props}
    >
      <Stack>
        <ChangePasswordModalMain columns={1}>
          <Input
            type="text"
            label="Enter old password"
            placeholder="Please Enter"
            value={state.oldPassword}
            onValue={(oldPassword) => setState({ ...state, oldPassword })}
          />
          <Input
            type="text"
            label="Enter new password"
            placeholder="Please Enter"
            value={state.newPassword}
            onValue={(newPassword) => setState({ ...state, newPassword })}
          />
          <Input
            type="text"
            label="Repeat new password"
            placeholder="Please Enter"
            value={state.repeatNewPassword}
            onValue={(repeatNewPassword) =>
              setState({ ...state, repeatNewPassword })
            }
          />
        </ChangePasswordModalMain>
      </Stack>
    </Modal>
  );
};

export default ChangePasswordModal;
