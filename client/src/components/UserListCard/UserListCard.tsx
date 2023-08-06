import { getLastSeen } from "../../util/dates";
import Avatar from "../Avatar/Avatar";
import styles from "./UserListCard.module.css";

interface Props {
  user: any;
  online: boolean;
}

const UserListCard = ({ user, online }: Props) => {
	console.log(user)
  return (
    <div className={styles.root}>
      <Avatar firstName={user.firstName} lastName={user.lastName} />
      <div className={styles.header}>
        <h4 className={styles.name}>
          {user.firstName} {user.lastName}
        </h4>
				<div>
					{user.house && (
						<div className={styles.house}>
							{user.house.title}
						</div>
					)}
				</div>
        <div className={styles.status}>
          {online ? (
            <>
              <span className={styles.indicator} />
              Online
            </>
          ) : user.onlineAt ? (
            getLastSeen(user.onlineAt)
          ) : (
            "Offline"
          )}
        </div>
      </div>
    </div>
  );
};

UserListCard.defaultProps = {
  online: false,
};

export default UserListCard;
