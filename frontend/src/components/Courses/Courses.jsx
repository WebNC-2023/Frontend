import { Navigation, Pagination, Autoplay, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import SchoolIcon from '@mui/icons-material/School';
import ReactPaginate from 'react-paginate';
import { useState, useEffect } from 'react';
import "./Courses.css";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
let courses_list = [
    {
        course_img: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera_assets/ddp/branding/illinois/iMBA+square.jpg?auto=format%2Ccompress%2C%20enhance&dpr=2&w=265&h=204&fit=crop&q=50",
        university_img: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/http://coursera-university-assets.s3.amazonaws.com/d8/42cdc0ab2011e8b910bdf80bed9f6c/CenterILblock-ISQUAREOrangeBackgrnd.png?auto=format%2Ccompress&dpr=2&w=25&h=25&q=40",
        university_name: "University of Illinois Gies College of Business",
        course_name: "Master of Business Administration (iMBA)"
    },
    {
        course_img: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera_assets/ddp/branding/ms-management-illinois/thumbnail.jpg?auto=format%2Ccompress%2C%20enhance&dpr=2&w=265&h=204&fit=crop&q=50",
        university_img: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/http://coursera-university-assets.s3.amazonaws.com/d8/42cdc0ab2011e8b910bdf80bed9f6c/CenterILblock-ISQUAREOrangeBackgrnd.png?auto=format%2Ccompress&dpr=2&w=25&h=25&q=40",
        university_name: "University of Illinois Urbana-Champaign",
        course_name: "Master of Science in Management (iMSM)"
    },
    {
        course_img: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera_assets/ddp/branding/imsa/imsa-thumbnail.jpg?auto=format%2Ccompress%2C%20enhance&dpr=2&w=265&h=204&fit=crop&q=50",
        university_img: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/http://coursera-university-assets.s3.amazonaws.com/d8/42cdc0ab2011e8b910bdf80bed9f6c/CenterILblock-ISQUAREOrangeBackgrnd.png?auto=format%2Ccompress&dpr=2&w=25&h=25&q=40",
        university_name: "Gies College of Business at the University of Illinois",
        course_name: "Master's of Accounting (iMSA)"
    },
    {
        course_img: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera_assets/ddp/branding/me-engineering-management-boulder/7f1ba63f-ce16-4c29-9690-557ac3eb3168.jpg?auto=format%2Ccompress%2C%20enhance&dpr=2&w=265&h=204&fit=crop&q=50",
        university_img: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/http://coursera-university-assets.s3.amazonaws.com/a6/7035b7e00b401383be4e5856b8bdaa/Boulder-FL-VERT-B---cropped.png?auto=format%2Ccompress&dpr=2&w=25&h=25&q=40",
        university_name: "University of Colorado Boulder",
        course_name: "Master of Engineering in Engineering Management"
    },
    {
        course_img: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera_assets/ddp/branding/msds-boulder/header.jpg?auto=format%2Ccompress%2C%20enhance&dpr=2&w=265&h=204&fit=crop&q=50",
        university_img: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/http://coursera-university-assets.s3.amazonaws.com/a6/7035b7e00b401383be4e5856b8bdaa/Boulder-FL-VERT-B---cropped.png?auto=format%2Ccompress&dpr=2&w=25&h=25&q=40",
        university_name: "University of Colorado Boulder",
        course_name: "Master of Science in Data Science"
    },
    {
        course_img: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera_assets/ddp/branding/msee-boulder/thumbnail.jpeg?auto=format%2Ccompress%2C%20enhance&dpr=2&w=265&h=204&fit=crop&q=50",
        university_img: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/http://coursera-university-assets.s3.amazonaws.com/a6/7035b7e00b401383be4e5856b8bdaa/Boulder-FL-VERT-B---cropped.png?auto=format%2Ccompress&dpr=2&w=25&h=25&q=40",
        university_name: "University of Colorado Boulder",
        course_name: "Master of Science in Electrical Engineering"
    },
    {
        course_img: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera_assets/ddp/branding/ms-computer-science-boulder/62f0f4eb-8630-41cb-bbeb-ca66ccb81fc6.jpg?auto=format%2Ccompress%2C%20enhance&dpr=2&w=265&h=204&fit=crop&q=50",
        university_img: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/http://coursera-university-assets.s3.amazonaws.com/a6/7035b7e00b401383be4e5856b8bdaa/Boulder-FL-VERT-B---cropped.png?auto=format%2Ccompress&dpr=2&w=25&h=25&q=40",
        university_name: "University of Colorado Boulder",
        course_name: "Master of Science in Computer Science"
    },
    {
        course_img: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera_assets/ddp/branding/bach-information-technology-illinois-tech/40ddc07b-ccec-49d4-b172-25ffcbdb6fe4.jpg?auto=format%2Ccompress%2C%20enhance&dpr=2&w=265&h=204&q=50&fit=crop",
        university_img: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/http://coursera-university-assets.s3.amazonaws.com/3d/1c8fdf7ef5404aa83ab0c00fa12cf5/LOGO_1.png?auto=format%2Ccompress&dpr=2&w=25&h=25&q=40",
        university_name: "Illinois Institute of Technology",
        course_name: "Bachelor of Information Technology"
    },
    {
        course_img: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera_assets/ddp/branding/bcs-uol/thumbnail.jpg?auto=format%2Ccompress%2C%20enhance&dpr=2&w=265&h=204&q=50&fit=crop",
        university_img: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/http://coursera-university-assets.s3.amazonaws.com/fb/b28a301e0211e8a40e23e4176c8e4a/UoL-Logo_180x180.png?auto=format%2Ccompress&dpr=2&w=25&h=25&q=40",
        university_name: "University of London",
        course_name: "BSc Computer Science"
    },
    {
        course_img: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera_assets/ddp/branding/msm-digital-transformation-healthcare-northeastern/a988cb18-82fc-4f29-87b9-315af6df02c0.jpg?auto=format%2Ccompress%2C%20enhance&dpr=2&w=265&h=204&q=50&fit=crop",
        university_img: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/http://coursera-university-assets.s3.amazonaws.com/6a/123cbd870d4619aab9613bb25578da/Red-N-on-white-background.png?auto=format%2Ccompress&dpr=2&w=25&h=25&q=40",
        university_name: "Northeastern University",
        course_name: "Online MS in Management"
    },
    {
        course_img: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera_assets/ddp/branding/mba-illinois-tech/14f38073-19e7-4f79-888d-7a9fd77b2398.jpg?auto=format%2Ccompress%2C%20enhance&dpr=2&w=265&h=204&q=50&fit=crop",
        university_img: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/http://coursera-university-assets.s3.amazonaws.com/3d/1c8fdf7ef5404aa83ab0c00fa12cf5/LOGO_1.png?auto=format%2Ccompress&dpr=2&w=25&h=25&q=40",
        university_name: "Illinois Institute of Technology",
        course_name: "Master of Business Administration"
    },
    {
        course_img: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera_assets/ddp/branding/mas-information-technology-illinois-tech/1b37393a-cb27-4fd3-8c3c-f8413ff31123.jpg?auto=format%2Ccompress%2C%20enhance&dpr=2&w=265&h=204&q=50&fit=crop",
        university_img: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/http://coursera-university-assets.s3.amazonaws.com/3d/1c8fdf7ef5404aa83ab0c00fa12cf5/LOGO_1.png?auto=format%2Ccompress&dpr=2&w=25&h=25&q=40",
        university_name: "Illinois Institute of Technology",
        course_name: "Master of Information Technology"
    },
];
const Courses = () => {
    const itemsPerPage = 8;
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [currentItems, setCurrentItems] = useState([]);
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % courses_list.length;
        setItemOffset(newOffset);
    };
    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(courses_list.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(courses_list.length / itemsPerPage));
    }, [itemOffset]);
    return (
        <>  <p className="best-seller-course-title">Best seller courses</p>
            <div className="best-seller-course">
                <div className="best-seller-courses-container">
                <button className="custom_next">
                    <i className="fa-solid fa-chevron-right"><NavigateNextIcon/></i>
                </button>
                <button className="custom_prev">
                    <i className="fa-solid fa-chevron-left"><NavigateBeforeIcon/></i>
                </button>
                <Swiper
                    modules={[Autoplay, Navigation, Pagination, A11y]}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false
                    }}
                    slidesPerGroup={1}
                    spaceBetween={20}
                    slidesPerView={1}
                    navigation={{
                        nextEl: ".custom_next",
                        prevEl: ".custom_prev"
                    }}
                    pagination={{ clickable: true }}
                    breakpoints={
                        {
                            640.02: {
                                slidesPerView: 2,
                            },
                            768.02: {
                                slidesPerView: 3,
                            },
                            1024.02: {
                                slidesPerView: 4,
                            },

                        }
                    }
                >
                    {courses_list.map((course, id) => {
                        return (
                            <SwiperSlide key={id}>
                                <div className="course-item-swiper">
                                    <div className="course-item-image">
                                        <img src={course.course_img} alt="course-img" />
                                    </div>
                                    <div className="course-university">
                                        <img src={course.university_img} alt="university-img" width="25px" height="25px" />
                                        <span>{course.university_name}</span>
                                    </div>
                                    <p className="course-name">
                                        {course.course_name}
                                    </p>
                                    <div className="course-earn-degree">
                                        <SchoolIcon />
                                        <span>Earn a degree</span>
                                    </div>
                                    <p className="course-degree">Degree</p>
                                </div>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
                </div>
            </div>
            <div className="courses-container">
                <p className="courses-list-title">Get a head start on a degree today</p>
                <div className="courses">
                    {currentItems.map((course, id) => {
                        return (
                            <div key={id} className="course-item">
                                <div className="course-item-image">
                                    <img src={course.course_img} alt="course-img" />
                                </div>
                                <div className="course-university">
                                    <img src={course.university_img} alt="university-img" width="25px" height="25px" />
                                    <span>{course.university_name}</span>
                                </div>
                                <p className="course-name">
                                    {course.course_name}
                                </p>
                                <div className="course-earn-degree">
                                    <SchoolIcon />
                                    <span>Earn a degree</span>
                                </div>
                                <p className="course-degree">Degree</p>
                            </div>
                        )
                    })}
                </div>
            </div>
            <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                pageCount={pageCount}
                previousLabel="<"
                renderOnZeroPageCount={null}
                containerClassName="pagination"
                pageLinkClassName="page-num"
                previousLinkClassName="page-num"
                nextLinkClassName="page-num"
                activeLinkClassName="active"
            />
        </>
    );
}

export default Courses;