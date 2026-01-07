import React from "react";
import styles from "src/components/UserTag.module.css";

import type { User } from "src/api/users";

export type UserTagProps = {
  user?: User;
  className: string;
};

export const UserTag = function UserTag({ user, className }: UserTagProps) {
  let content = (
    <div className={`${styles.userTag} ${className}`}>
      <span>Not assigned</span>
    </div>
  );
  if (user) {
    content = (
      <div className={`${styles.userTag} ${className}`}>
        <img
          src={user.profilePictureUrl ? user.profilePictureUrl : "/userDefault.svg"}
          alt={user.name}
        />
        <span>{user.name || "Unnamed User"}</span>
      </div>
    );
  }

  return content;
};
