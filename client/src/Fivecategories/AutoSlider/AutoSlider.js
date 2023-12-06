import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "../AutoSlider/AutoSlider.css"
import Navbar from "../../PagesJS/Navbar/navbar"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BlueBoobkMark from "../../SVG/bookmarksolid.svg"
import WhiteBoobkMark from "../../SVG/bookmark_solidwhite.svg"
import Redheart from "../../SVG/heart-solidRed.svg"
import Whiteheart from "../../SVG/heart-solid_White.svg"
import axios from 'axios';

const AutoSlider = (props) => {
    const Navigate = useNavigate();
    const [isBookMarkClicked, setIsBookMarkClicked] = useState(false);
    const [images, setImages] = useState([{ Add_Image_URL: "https://mir-s3-cdn-cf.behance.net/project_modules/hd/b6e0b072897469.5bf6e79950d23.gif", Select_category: "food", Story_Description: "food", Your_heading: "food", }, { Add_Image_URL: "https://mir-s3-cdn-cf.behance.net/project_modules/hd/b6e0b072897469.5bf6e79950d23.gif", Select_category: "food", Story_Description: "food", Your_heading: "food", }, { Add_Image_URL: "https://mir-s3-cdn-cf.behance.net/project_modules/hd/b6e0b072897469.5bf6e79950d23.gif", Select_category: "food", Story_Description: "food", Your_heading: "food", }])
    const [likesarray, setLikesarray] = useState([])
    const [islikeIdMAtched, setIslikeIdMAtched] = useState(false)
    const [addRedheart, setAddRedheart] = useState(false)
    // *****************************************************************************************************//

    //acessing the id we are getting from URL
    const { id } = useParams();
    //console.log('URL ID: - ', id);


    // *****************************************************************************************************//

    // click heart icon for like

    const clickHeart = useCallback(async () => {
        console.log('heart clicked');
        try {
            if (islikeIdMAtched) {
                await axios.delete(`http://localhost:8000/delete/${id}`);
                console.log('double clicked like  slide id removed ');
                setAddRedheart(false);
                setIslikeIdMAtched(false);
            } else {
                await axios.post("http://localhost:8000/storeLikes", { id });
                console.log('like clicked slide id stored');
                setAddRedheart(true);
                setIslikeIdMAtched(true);
            }
        } catch (error) {
            console.log("clickHeart error- ", error);
        }
    }, [islikeIdMAtched, id]);

    // *****************************************************************************************************//


    useEffect(() => {

        async function dataFromId() {
            try {
                let slideData = await axios.get(`http://localhost:8000/AutoSlider/${id}`)
                setImages(slideData.data[0].aslide)
                // console.log('slideData_from_id - ', slideData.data[0].aslide);
            } catch (error) {
                console.log("dataFromId error:- ", error)
            }
        }

        // ***********
        async function gettingLikeArray() {
            try {
                const LikeArray = await axios.get("http://localhost:8000/getAllLikes");
                //getting full likes array for setting likes count
                setLikesarray(LikeArray.data.likesarray)
                //to check if the opened slide id is saved in likes array or  not
                const ismatched = await LikeArray.data.likesarray.some(obj => obj.slideid === id)

                if (ismatched) {
                    console.log('ismatched:- ', ismatched);
                    setIslikeIdMAtched(ismatched)
                    setAddRedheart(true)
                } else {
                    console.log('ismatched:- ', ismatched);
                    setIslikeIdMAtched(false)
                    setAddRedheart(false)
                }

                //printing full likes array 
                console.log("LikeArray:- ", LikeArray.data.likesarray);
            } catch (error) {
                console.error("gettingLikeArray error:- ", error)
            }
        }


        dataFromId();
        gettingLikeArray();

    }, [id, setImages, clickHeart])

    // *****************************************************************************************************//

    const [currentIndex, setCurrentIndex] = useState(0);
    const [progressWidths, setProgressWidths] = useState(
        images.map(() => '0%')
    );

    const updateProgress = useCallback(() => {
        setProgressWidths((prevProgressWidths) =>
            prevProgressWidths.map((_, index) =>
                index === currentIndex ? '100%' : '0%'
            )
        );
        setTimeout(() => {
            setProgressWidths((prevProgressWidths) =>
                prevProgressWidths.map((_, index) =>
                    index === currentIndex ? '0%' : '0%'
                )
            );
        }, 50);
    }, [currentIndex]);


    const nextSlide = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        updateProgress();
    }, [images.length, updateProgress]);

    const prevSlide = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
        updateProgress();
    }, [images.length, updateProgress]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            nextSlide();
        }, 3000);

        return () => {
            clearInterval(intervalId);
        };
    }, [currentIndex, nextSlide]);

    // *****************************************************************************************************//

    //Auto slider closing x sigh
    function autoSliderX() {
        Navigate("/")
    }
    // *****************************************************************************************************//

    //click share icon for copy
    async function clickForCopy() {
        try {
            //  Clipboard API to copy text
            await navigator.clipboard.writeText(window.location.href);
            toast.success('copied!', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })

        } catch (error) {
            console.error('Unable to copy URL:', error);
        }
    }


    // *****************************************************************************************************//

    //clickBookmark
    function clickBookmark() {
        console.log('BookMarkClicked');
        setIsBookMarkClicked((pre) => !pre)
    }
    // *****************************************************************************************************//

    return (
        <>
            <Navbar className="navbar--in--AUtoSlider" />
            <ToastContainer />

            <div className="div--black--shadow">

                <div className="The--main--container">
                    <div className="slider-container">

                        <p className='X--for--close--autoSlider' onClick={autoSliderX}>X</p>
                        <i class="fa-solid fa-paper-plane" onClick={clickForCopy}></i>

                        <div className="slider" style={{
                            transform: `translateX(-${currentIndex * 100}%)`, transition: `transform 0.5s ease-in-out`
                        }}>
                            {images.map((obj, index) => (
                                <>
                                    <div key={index} className="slide" style={{ width: '100%' }}>
                                        <img src={obj.Add_Image_URL} alt={obj.Your_heading} style={{ width: '100%' }} key={index} />
                                    </div>

                                </>
                            ))}
                        </div>

                        <div className="progress-container">
                            {images.map((obj, index) => (
                                <div key={index} className={`progress-bar ${index === currentIndex ? 'active' : ''}`} style={{ width: progressWidths[index] }}>
                                </div>
                            ))}
                        </div>

                        <div className="controls">
                            <button onClick={prevSlide}><i class="fa-solid fa-chevron-left"></i></button>
                            <button onClick={nextSlide}><i class="fa-solid fa-chevron-right"></i></button>
                        </div>

                        <img src={(isBookMarkClicked) ? BlueBoobkMark : WhiteBoobkMark} alt="Bookmark" id="AutoSlider--bookmark" onClick={clickBookmark} />

                        <div id="HearatIcon--div">
                            <img src={(addRedheart) ? Redheart : Whiteheart} alt="Heart" className='heartIcon' onClick={clickHeart} />
                            <h3 className='Heart--count'>{likesarray.length}</h3>
                        </div>

                    </div>

                </div>

            </div>
        </>
    );
};

export default AutoSlider;
