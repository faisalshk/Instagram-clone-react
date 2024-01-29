import {
    Box,
    Button,
    CloseButton,
    Flex,
    Image,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Textarea,
    Tooltip,
    useDisclosure,
} from "@chakra-ui/react";
import { CreatePostLogo } from "../../assest/Constants";
import { BsFillImageFill } from "react-icons/bs";
import { useRef, useState } from "react";
import usePreviewimg from "../../hooks/usePreviewimg";
import useShowToast from "../../hooks/useShowToast";
import useauthStore from "../../store/authStore";
import usePostStore from "../../store/usePostStore";
import useUserProfileStore from "../../store/useUserProfileStore";
import { useLocation } from "react-router-dom";
import { addDoc, arrayUnion, collection, doc, updateDoc } from "firebase/firestore";
import { firestore, storage } from "../../firebase/firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

const CreatePost = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    //this is the same hook we used in the change the profile image, and we are using this same hook to post and image
    const { handleImageChange, selectedFile, setSelectedFile } = usePreviewimg();

    //state to sotre and update the caption
    const [caption, setCaption] = useState("");

    // creating a refrence to open the modal to select the image.
    const imageRef = useRef(null);
    const showToast = useShowToast()
    const { isLoading, handleCreatePost } = useCreatePost()

    const handlePostCreation = async function () {
        try {

            await handleCreatePost(selectedFile, caption)
            //when the post is created close the modal
            onClose()
            //set the caption to null
            setCaption('')
            //set the selected file to null
            setSelectedFile(null)

        } catch (error) {
            showToast('Error', error.message, 'error')
        }
    }

    return (
        <>
            <Tooltip
                hasArrow
                label={"Create"}
                placement="right"
                ml={1}
                openDelay={500}
                display={{ base: "block", md: "none" }}
            >
                <Flex
                    alignItems={"center"}
                    gap={4}
                    _hover={{ bg: "whiteAlpha.400" }}
                    borderRadius={6}
                    p={2}
                    w={{ base: 10, md: "full" }}
                    justifyContent={{ base: "center", md: "flex-start" }}
                    onClick={onOpen}
                >
                    <CreatePostLogo />
                    <Box display={{ base: "none", md: "block" }}>Create</Box>
                </Flex>
            </Tooltip>

            {/* modal */}
            <Modal isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />

                <ModalContent bg={"black"} border={"1px solid gray"}>
                    <ModalHeader>Create Post</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Textarea
                            placeholder="Post caption..."
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                        />

                        {/* using the imageRef here */}
                        <Input
                            type="file"
                            hidden
                            ref={imageRef}
                            onChange={handleImageChange}
                        />

                        {/* when we click on this icone the input type file will open which is above to select images to post */}
                        <BsFillImageFill
                            onClick={() => imageRef.current.click()}
                            style={{
                                marginTop: "15px",
                                marginLeft: "5px",
                                cursor: "pointer",
                            }}
                            size={16}
                        />

                        {/* if there is a selected file the we render that file below the icon */}

                        {selectedFile && (
                            <Flex
                                mt={5}
                                w={"full"}
                                position={"relative"}
                                justifyContent={"center"}
                            >
                                <Image src={selectedFile} alt="Selected Image" />
                                <CloseButton
                                    position={"absolute"}
                                    top={2}
                                    right={2}
                                    onClick={() => setSelectedFile("")}
                                />
                            </Flex>
                        )}
                    </ModalBody>

                    <ModalFooter>
                        <Button mr={3} onClick={handlePostCreation} isLoading={isLoading}>Post</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default CreatePost;

//Creating a hook to post the image

const useCreatePost = function () {
    const showToast = useShowToast()
    const authUser = useauthStore((state) => state.user);

    const [isLoading, setIsLoading] = useState(false)
    const createPost = usePostStore(state => state.createPost)
    const addPost = useUserProfileStore(state => state.addPost)

    const { pathname } = useLocation()

    const handleCreatePost = async function (selectedFile, caption) {
        // if no selected file throw the error
        if (isLoading) return;
        if (!selectedFile) {
            throw new Error('Please Select an Image')
        }
        // loading state is true
        setIsLoading(true)

        // create a new post object to store the post data
        const newPost = {
            caption: caption,
            likes: [],
            comments: [],
            createdAt: Date.now(),
            createdBy: authUser.uid,
        }
        console.log(newPost)

        try {

            //creating a new post collection document to store the post data
            const postDocRef = await addDoc(collection(firestore, "posts"), newPost);
            //getting the userDoc to update the users collection
            const userDocRef = doc(firestore, "users", authUser.uid);
            // storing the image data in the firebase storage->posts/id path
            // this will make a new folder in the storage name posts which will have the image downloadUrl
            const imageRef = ref(storage, `posts/${postDocRef.id}`);
            //updating the post array in the users collection at the id of the post
            await updateDoc(userDocRef, { post: arrayUnion(postDocRef.id) })
            // uploading the selectedfile data in the path which is in the image ref
            await uploadString(imageRef, selectedFile, 'data_url')

            const downloadUrl = await getDownloadURL(imageRef)
            //the newpost object does not have a imageUrl therefore we are updating the newPost document in the post collection and also in the object
            await updateDoc(postDocRef, { imageUrl: downloadUrl })
            newPost.imageUrl = downloadUrl

            createPost({ ...newPost, id: postDocRef.id })
            addPost({ ...newPost, id: postDocRef.id })

            showToast('Success', 'Post Created Successfully', 'success')
        } catch (error) {
            showToast('Error', error.message, 'error')
        } finally {
            setIsLoading(false)
        }
    }

    return { handleCreatePost, isLoading }
}