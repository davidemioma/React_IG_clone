import React from "react";
import {
  SearchIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  PaperAirplaneIcon,
  MenuIcon,
} from "@heroicons/react/outline";
import { HomeIcon } from "@heroicons/react/solid";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { auth } from "../../firebase";
import { openModal } from "../../store/store";
import classes from "./Header.module.css";

const Header = () => {
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.user.currentUser);

  const navigate = useNavigate();

  return (
    <div className={classes.container}>
      <div className={`container ${classes.header}`}>
        <div className={classes.logo}>
          <img
            className={classes.logo_xl}
            src="https://links.papareact.com/ocw"
            alt=""
            onClick={() => navigate("/", { push: true })}
          />

          <img
            className={classes.logo_sm}
            src="https://links.papareact.com/jjm"
            alt=""
            onClick={() => navigate("/", { push: true })}
          />
        </div>

        <div className={classes.search}>
          <SearchIcon className={classes.icon_xl} color="#cccccc" />

          <input type="text" placeholder="Search" />
        </div>

        {currentUser ? (
          <div className={classes.icons}>
            <HomeIcon
              onClick={() => navigate("/", { push: true })}
              color="black"
              className={`${classes.icon_xl} ${classes.icon_lg}`}
            />

            <MenuIcon className={`${classes.icon_xl} ${classes.icon_sm}`} />

            <div className={`${classes.specialIcon} ${classes.icon_lg}`}>
              <PaperAirplaneIcon
                className={`${classes.icon_xl} ${classes.icon_plane}`}
              />
              <div>3</div>
            </div>

            <PlusCircleIcon
              className={`${classes.icon_xl}`}
              onClick={() => dispatch(openModal())}
            />

            <UserGroupIcon
              className={`${classes.icon_xl} ${classes.icon_lg}`}
            />

            <HeartIcon className={`${classes.icon_xl} ${classes.icon_lg}`} />

            <img
              className={classes.avatar}
              onClick={() => auth.signOut()}
              src={currentUser.userImg}
              alt="profile pic"
            />
          </div>
        ) : (
          <div className={classes.offline}>
            <MenuIcon className={`${classes.icon_xl} `} />

            <button onClick={() => navigate("/signin", { push: true })}>
              Sign In
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
