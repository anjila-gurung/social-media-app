import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import EditeModal from "./EditeModal";
import noImg from "../../images/user.png";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
// components
import { Button } from "../../components";
// Redux
import { signOut, updateImage } from "../../redux/actions/userActions";
// icons
import {
	MdCreate,
	MdLocationOn,
	MdLink,
	MdDateRange,
	MdKeyboardReturn,
} from "react-icons/md";
// Styles
import styles from "./userProfile.module.css";

dayjs.extend(relativeTime);
// main
const UserProfile = ({ history }) => {
	const dispatch = useDispatch();
	const loading = useSelector(state => state.ui.loading);
	const authenticated = useSelector(state => state.user.authenticated);
	const credentials = useSelector(state => state.user.credentials);
	const {
		userHandle,
		avatarURL,
		createdAt,
		bio,
		location,
		websiteUrl,
	} = credentials;

	const handleChangeFile = e => {
		const img = e.target.files[0];
		dispatch(updateImage(img));
	};
	const clickInputFile = () => {
		document.getElementById("refFile").click();
	};

	return (
		<div className={styles.userProfile}>
			<div className='container'>
				{authenticated ? (
					<div className={styles.content}>
						<div className={styles.imgBox}>
							<img
								src={avatarURL || noImg}
								className={styles.imgUser}
								alt='imgUser'
								width='100'
								height='100'
							/>
							<input
								type='file'
								hidden
								onChange={handleChangeFile}
								id='refFile'
							/>
							{!loading && (
								<MdCreate
									className={styles.editIcon}
									onClick={clickInputFile}
								/>
							)}
							<div className={styles.spinner} hidden={!loading}></div>
						</div>
						<div className={styles.infoBox}>
							<p style={{fontSize:"30px"}}>{userHandle}</p>
							{bio && <p style={{color: "#999"}}>{bio}</p>}
							{location && (
								<p style={{color: "#999"}}>
									<MdLocationOn className={styles.icon} /> {location}
								</p>
							)}
							{websiteUrl && (
								<p style={{color: "#999"}}>
									<MdLink className={styles.icon} />
									<a style={{color: "#999"}} href='http://google.com'>{websiteUrl}</a>
								</p>
							)}
							<p>
								<MdDateRange className={styles.icon} style={{color: "#999"}} />
								<time style={{color: "#999"}} dateTime={createdAt}>{dayjs(createdAt).fromNow()}</time>
							</p>

							{/* Modal button for edite */}
							<EditeModal />

							{/* button for logout */}
							<MdKeyboardReturn
								className={styles.logoutIcon}
								onClick={() => dispatch(signOut(history))}
							/>
							{/* <Link to={`/users/${userHandle}`}>
								<Button smallButton>View My Post</Button>
							</Link> */}
						</div>
					</div>
				) : (
					<p className={styles.noUser}>
						Please Create New Account or if you have Signin
					</p>
				)}
			</div>
		</div>
	);
};

export default UserProfile;
