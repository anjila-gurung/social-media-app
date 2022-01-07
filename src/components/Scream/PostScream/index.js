import { useEffect, useRef, useState } from "react";
import { Button, Field, Form, Modal } from "../.."; /* Modal Post New Scream */
import { useForm } from "react-hook-form";
// icons
import { MdAdd } from "react-icons/md";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { postScream } from "../../../redux/actions/dataActions";
// styles
import styles from "./PostScream.module.css";
import {storageRef, db} from "../../../util/firebase"
import firebase from "firebase";


const PostScream = () => {
	const { register, handleSubmit, formState } = useForm();
	const { errors } = formState;
	const refModal = useRef();
	const [showModal, setShowModal] = useState(false);
	const dispatch = useDispatch();
	const loading = useSelector(state => state.ui.loading);
	const [img, setImg] = useState(null);
	const [progress, setProgress] = useState(0);

	const handleOnSubmit = data => {
		// dispatch(postScream(data.post));
		console.log(data, "this is data 1121312312312")
		dispatch(postScream(data));

	};

	const handleClickOutContentModal = e => {
		if (refModal.current === e.target) {
			setShowModal(false);
		}
	};

	useEffect(() => {
		if (!loading && showModal) {
			setShowModal(false);
		}
	}, [loading]);
	
	const handleChange = (e) => {
		console.log("changed",e.target.files[0])
		if(e.target.files[0]){
			setImg(e.target.files[0]);
			// var src1 = URL.createObjectURL(e.target.files[0]);
			// var preview1 = document.getElementById("image-1-preview");
			// preview1.src = src1;
			// preview1.style.display = "block";
		}
	}

	const handleUpload = () => {
		if (img) {
			console.log("clicked ", )
		  const uploadTask = storageRef.ref(`images/${img.name}`).put(img);
	
		  uploadTask.on(
			"state_changed",
			(snapshot) => {
			  // progress function .....
			  const progress = Math.round(
				(snapshot.bytesTransferred / snapshot.totalBytes) * 100
			  );
			  setProgress(progress);
			},
			(error) => {
			  // Error function...
			  console.log(error);
			  alert(error.message);
			},
			() => {
			  // upload complete function
			  storageRef
				.ref("image")
				.child(img.name)
				.getDownloadURL()
				.then((url) => {
				  db.collection("posts").add({
					timestamp: firebase.firestore.FieldValue.serverTimestamp(),
					// caption: caption,
					postImageUrl: url,
					userName: "Anjila Gurung",
					userProfileUrl:
					  "https://avatars0.githubusercontent.com/u/55942632?s=460&u=f702a3d87d1f9c125f1ead9b3bec93d26cd3b3a0&v=4",
				  });
				});
				console.log(img,)
			//   setProgress(0);
			//   setCaption("");
			  setImg(null);
			//   var preview1 = document.getElementById("image-1-preview");
			//   preview1.style.display = "none";
			}
		  );
		}
	  };
	return (
		<>
			<MdAdd className={styles.addIcon} onClick={() => setShowModal(true)} />
			<Modal
				showModal={showModal}
				onClick={handleClickOutContentModal}
				ref={refModal}
			>
				<Form onSubmit={handleSubmit(handleOnSubmit)}>
					<Field
						name='post'
						label='Post New Scream'
						ref={register({ required: "Can't be Empty" })}
						textarea
						error={errors.post}
					/>
					<Field
					name='image'
					// label='Pjhasjdh'
					// ref={register({ required: "Can't be Empty" })}
					// textarea
					// error={errors.post}
						name="image"
						// id="file-input"
						type="file"
						accept="image/*"
						// onChange={handleChange}
						ref={register({ required: "Can't be Empty" })}
						// textarea
						error={errors.post}
					/>
					<Button largeButton disabled={loading}>
						Post
					</Button>
				</Form>

			</Modal>
		</>
	);
};

export default PostScream;
