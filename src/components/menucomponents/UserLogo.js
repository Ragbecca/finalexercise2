import { fill } from "@cloudinary/url-gen/actions/resize";
import { CloudinaryImage } from '@cloudinary/url-gen';
import { AdvancedImage } from "@cloudinary/react";
import React, { useEffect, useState } from "react";
import * as apiCalls from "../../api/apiCalls"
import AuthContext from "../../misc/AuthContext";
import { getBase64Image, capitalizeFirstLetter } from "../../misc/Helpers";

const UserLogo = () => {
    const contextType = React.useContext(AuthContext);
    const [userInfo, setUserInfo] = useState([]);
    const [userName, setUserName] = useState('');
    const [initialCall, setInitialCall] = useState(true);
    const [userImage, setUserImage] = useState(null)
    const [loadToLocal, setLoadToLocal] = useState(false);

    function checkIfHasLogo() {
        apiCalls.getUserInfo(contextType.getUser(), contextType.getUser().data.name).then(response => setUserInfo(response.data));
    }

    useEffect(() => {
        if ((userInfo.avatarURL !== null && userInfo.avatarURL !== undefined) &&
            (localStorage.getItem(userInfo.avatarURL) !== null && localStorage.getItem(userInfo.avatarURL) !== undefined)) {
            let dataImage = localStorage.getItem(userInfo.avatarURL);
            const bannerImg = document.getElementById(userInfo.avatarURL);
            bannerImg.src = dataImage;
        }
        else if (userInfo.avatarURL !== null && userInfo.avatarURL !== undefined) {
            setUserImage(new CloudinaryImage(userInfo.avatarURL, { cloudName: 'dooq4p0ou' }).resize(fill().width(200).height(200)));
            setLoadToLocal(true);
        }
        if (userInfo.firstName !== null && userInfo.firstName !== undefined) {
            if (userInfo.lastName !== null && userInfo.lastName !== undefined) {
                setUserName(capitalizeFirstLetter(userInfo.firstName) + " " + capitalizeFirstLetter(userInfo.lastName));
            } else {
                setUserName(capitalizeFirstLetter(userInfo.firstName));
            }
        } else if (userInfo.user !== undefined) {
            setUserName(userInfo.user.username);
        }
    }, [userInfo])

    async function loadToLocalFromImage() {
        await new Promise(resolve => setTimeout(resolve, 5000));
        if (userImage !== undefined && userImage !== null &&
            userInfo.avatarURL !== null && userInfo.avatarURL !== undefined) {
            let bannerImage = document.getElementById(userInfo.avatarURL);
            bannerImage.crossOrigin = 'Anonymous';
            getBase64Image(bannerImage, userInfo.avatarURL);
        }
    }

    if (loadToLocal) {
        setLoadToLocal(false);
        loadToLocalFromImage();
    }

    if (initialCall) {
        setInitialCall(false);
        checkIfHasLogo();
    }


    return <div className="user-menu poppins-bold">
        {userInfo.avatarURL !== undefined && userImage !== [] && localStorage.getItem(userInfo.avatarURL) === null && <AdvancedImage className="user-menu-image" id={userInfo.avatarURL} cldImg={userImage} />}
        {userInfo.avatarURL !== undefined && localStorage.getItem(userInfo.avatarURL) !== null && <img src="/unknown.png" className="user-menu-image" id={userInfo.avatarURL} alt="User"></img>}
        <div className="user-menu-name">{userName}</div>
    </div>
}

export default UserLogo;