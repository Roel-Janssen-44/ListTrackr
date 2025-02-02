'use client';

import { useState } from 'react';
import { editUser } from '@/app/lib/actions';
import { Button } from '@/app/components/button';

export default function EditUserName({ user }) {
  const [userState, setUserState] = useState({ name: user.name });

  const updateUser = editUser.bind(null, userState);

  return (
    <div className="flex items-center gap-2">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          await editUser(formData);
        }}
      >
        <div className="mb-2 flex flex-col gap-1">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            className="w-40 rounded-md border p-2"
            id="username"
            name="username"
            value={userState.name}
            onChange={(e) => {
              setUserState((prev) => ({ ...prev, name: e.target.value }));
            }}
          />
        </div>
        <Button>Save</Button>
      </form>
    </div>
  );
}
