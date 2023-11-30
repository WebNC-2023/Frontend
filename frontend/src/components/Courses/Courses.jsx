import { Navigation, Pagination, Autoplay, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SchoolIcon from "@mui/icons-material/School";
import ReactPaginate from "react-paginate";
import { useState, useEffect } from "react";
import "./Courses.css";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
let courses_list = [
  {
    course_img:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera_assets/ddp/branding/illinois/iMBA+square.jpg?auto=format%2Ccompress%2C%20enhance&dpr=2&w=265&h=204&fit=crop&q=50",
    university_img:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/http://coursera-university-assets.s3.amazonaws.com/d8/42cdc0ab2011e8b910bdf80bed9f6c/CenterILblock-ISQUAREOrangeBackgrnd.png?auto=format%2Ccompress&dpr=2&w=25&h=25&q=40",
    university_name: "University of Illinois Gies College of Business",
    course_name: "Master of Business Administration (iMBA)",
  },
  {
    course_img:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera_assets/ddp/branding/ms-management-illinois/thumbnail.jpg?auto=format%2Ccompress%2C%20enhance&dpr=2&w=265&h=204&fit=crop&q=50",
    university_img:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/http://coursera-university-assets.s3.amazonaws.com/d8/42cdc0ab2011e8b910bdf80bed9f6c/CenterILblock-ISQUAREOrangeBackgrnd.png?auto=format%2Ccompress&dpr=2&w=25&h=25&q=40",
    university_name: "University of Illinois Urbana-Champaign",
    course_name: "Master of Science in Management (iMSM)",
  },
  {
    course_img:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera_assets/ddp/branding/imsa/imsa-thumbnail.jpg?auto=format%2Ccompress%2C%20enhance&dpr=2&w=265&h=204&fit=crop&q=50",
    university_img:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/http://coursera-university-assets.s3.amazonaws.com/d8/42cdc0ab2011e8b910bdf80bed9f6c/CenterILblock-ISQUAREOrangeBackgrnd.png?auto=format%2Ccompress&dpr=2&w=25&h=25&q=40",
    university_name: "Gies College of Business at the University of Illinois",
    course_name: "Master's of Accounting (iMSA)",
  },
  {
    course_img:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera_assets/ddp/branding/me-engineering-management-boulder/7f1ba63f-ce16-4c29-9690-557ac3eb3168.jpg?auto=format%2Ccompress%2C%20enhance&dpr=2&w=265&h=204&fit=crop&q=50",
    university_img:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/http://coursera-university-assets.s3.amazonaws.com/a6/7035b7e00b401383be4e5856b8bdaa/Boulder-FL-VERT-B---cropped.png?auto=format%2Ccompress&dpr=2&w=25&h=25&q=40",
    university_name: "University of Colorado Boulder",
    course_name: "Master of Engineering in Engineering Management",
  },
  {
    course_img:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera_assets/ddp/branding/msds-boulder/header.jpg?auto=format%2Ccompress%2C%20enhance&dpr=2&w=265&h=204&fit=crop&q=50",
    university_img:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/http://coursera-university-assets.s3.amazonaws.com/a6/7035b7e00b401383be4e5856b8bdaa/Boulder-FL-VERT-B---cropped.png?auto=format%2Ccompress&dpr=2&w=25&h=25&q=40",
    university_name: "University of Colorado Boulder",
    course_name: "Master of Science in Data Science",
  },
  {
    course_img:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera_assets/ddp/branding/msee-boulder/thumbnail.jpeg?auto=format%2Ccompress%2C%20enhance&dpr=2&w=265&h=204&fit=crop&q=50",
    university_img:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/http://coursera-university-assets.s3.amazonaws.com/a6/7035b7e00b401383be4e5856b8bdaa/Boulder-FL-VERT-B---cropped.png?auto=format%2Ccompress&dpr=2&w=25&h=25&q=40",
    university_name: "University of Colorado Boulder",
    course_name: "Master of Science in Electrical Engineering",
  },
  {
    course_img:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera_assets/ddp/branding/ms-computer-science-boulder/62f0f4eb-8630-41cb-bbeb-ca66ccb81fc6.jpg?auto=format%2Ccompress%2C%20enhance&dpr=2&w=265&h=204&fit=crop&q=50",
    university_img:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/http://coursera-university-assets.s3.amazonaws.com/a6/7035b7e00b401383be4e5856b8bdaa/Boulder-FL-VERT-B---cropped.png?auto=format%2Ccompress&dpr=2&w=25&h=25&q=40",
    university_name: "University of Colorado Boulder",
    course_name: "Master of Science in Computer Science",
  },
  {
    course_img:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera_assets/ddp/branding/bach-information-technology-illinois-tech/40ddc07b-ccec-49d4-b172-25ffcbdb6fe4.jpg?auto=format%2Ccompress%2C%20enhance&dpr=2&w=265&h=204&q=50&fit=crop",
    university_img:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/http://coursera-university-assets.s3.amazonaws.com/3d/1c8fdf7ef5404aa83ab0c00fa12cf5/LOGO_1.png?auto=format%2Ccompress&dpr=2&w=25&h=25&q=40",
    university_name: "Illinois Institute of Technology",
    course_name: "Bachelor of Information Technology",
  },
  {
    course_img:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera_assets/ddp/branding/bcs-uol/thumbnail.jpg?auto=format%2Ccompress%2C%20enhance&dpr=2&w=265&h=204&q=50&fit=crop",
    university_img:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/http://coursera-university-assets.s3.amazonaws.com/fb/b28a301e0211e8a40e23e4176c8e4a/UoL-Logo_180x180.png?auto=format%2Ccompress&dpr=2&w=25&h=25&q=40",
    university_name: "University of London",
    course_name: "BSc Computer Science",
  },
  {
    course_img:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera_assets/ddp/branding/msm-digital-transformation-healthcare-northeastern/a988cb18-82fc-4f29-87b9-315af6df02c0.jpg?auto=format%2Ccompress%2C%20enhance&dpr=2&w=265&h=204&q=50&fit=crop",
    university_img:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/http://coursera-university-assets.s3.amazonaws.com/6a/123cbd870d4619aab9613bb25578da/Red-N-on-white-background.png?auto=format%2Ccompress&dpr=2&w=25&h=25&q=40",
    university_name: "Northeastern University",
    course_name: "Online MS in Management",
  },
  {
    course_img:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera_assets/ddp/branding/mba-illinois-tech/14f38073-19e7-4f79-888d-7a9fd77b2398.jpg?auto=format%2Ccompress%2C%20enhance&dpr=2&w=265&h=204&q=50&fit=crop",
    university_img:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/http://coursera-university-assets.s3.amazonaws.com/3d/1c8fdf7ef5404aa83ab0c00fa12cf5/LOGO_1.png?auto=format%2Ccompress&dpr=2&w=25&h=25&q=40",
    university_name: "Illinois Institute of Technology",
    course_name: "Master of Business Administration",
  },
  {
    course_img:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera_assets/ddp/branding/mas-information-technology-illinois-tech/1b37393a-cb27-4fd3-8c3c-f8413ff31123.jpg?auto=format%2Ccompress%2C%20enhance&dpr=2&w=265&h=204&q=50&fit=crop",
    university_img:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/http://coursera-university-assets.s3.amazonaws.com/3d/1c8fdf7ef5404aa83ab0c00fa12cf5/LOGO_1.png?auto=format%2Ccompress&dpr=2&w=25&h=25&q=40",
    university_name: "Illinois Institute of Technology",
    course_name: "Master of Information Technology",
  },
];
let best_courses = [
  {
    course_img:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://d15cw65ipctsrr.cloudfront.net/20/8f15cc441443de8a35271d25610e22/Google-cybersecurity.jpeg?auto=format%2Ccompress%2C%20enhance&dpr=2&w=265&h=216&fit=crop&q=50",
    university_img:
      "http://coursera-university-assets.s3.amazonaws.com/4a/cb36835ae3421187080898a7ecc11d/Google-G_360x360.png",
    university_name: "Google",
    course_name: "Google Cybersecurity Professional Certificate",
  },
  {
    course_img:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://d15cw65ipctsrr.cloudfront.net/23/22bc54f77f45a2b057f4ff518d272f/iStock-1169539468.jpg?auto=format%2Ccompress%2C%20enhance&dpr=2&w=265&h=216&fit=crop&q=50",
    university_img:
      "http://coursera-university-assets.s3.amazonaws.com/bb/f5ced2bdd4437aa79f00eb1bf7fbf0/IBM-Logo-Blk---Square.png",
    university_name: "IBM",
    course_name: "IBM Data Science Professional Certificate",
  },
  {
    course_img:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera-course-photos/25/100f488610437c8409a9af3d5a8066/DeepLearning_Generative_AI_for_Everyone_Banner_1000x1000_F.png?auto=format%2Ccompress%2C%20enhance&dpr=2&w=265&h=216&fit=crop&q=50",
    university_img:
      "http://coursera-university-assets.s3.amazonaws.com/b4/5cb90bb92f420b99bf323a0356f451/Icon.png",
    university_name: "DeepLearning.AI",
    course_name: "Generative AI for Everyone",
  },
  {
    course_img:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://d15cw65ipctsrr.cloudfront.net/1e/9830d71e1d48ba8b883e3912b9a144/IBM-Digital-Strategy_Specialization_600x600b.jpg?auto=format%2Ccompress%2C%20enhance&dpr=2&w=265&h=216&fit=crop&q=50",
    university_img:
      "http://coursera-university-assets.s3.amazonaws.com/d4/6c1c1ee0ca48c5993298bb2e0c7f46/Darden_Foundation_Monogram_360x360.png",
    university_name: "University of Virginia Darden School Foundation",
    course_name: "IBM & Darden Digital Strategy Specialization",
  },
  {
    course_img:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://d15cw65ipctsrr.cloudfront.net/ed/d25c0d25114924a34754928dbf8273/Front-end-dev-ProCert.png?auto=format%2Ccompress%2C%20enhance&dpr=2&w=265&h=216&q=50&fit=crop",
    university_img:
      "http://coursera-university-assets.s3.amazonaws.com/73/e03b13a8e44df9b19eb279e5506396/360-x-360.png",
    university_name: "Meta",
    course_name: "Meta Front-End Developer Professional Certificate",
  },
  {
    course_img:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://d15cw65ipctsrr.cloudfront.net/0a/78a20b48fe419ea3f857ea43e3e38b/IT-Project-Management-PC.jpg?auto=format%2Ccompress%2C%20enhance&dpr=2&w=265&h=216&fit=crop&q=50",
    university_img:
      "http://coursera-university-assets.s3.amazonaws.com/57/2f1c35bd4a4a6d94bde7d622267b9c/Partner-landing-page-Logo-2.png",
    university_name: "skillUp EdTech",
    course_name: "IBM IT Project Manager Professional Certificate",
  },
  {
    course_img:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://d15cw65ipctsrr.cloudfront.net/8c/e0f2fd124b441fa8d9aa68fdab2167/Marketing-Image.png?auto=format%2Ccompress%2C%20enhance&dpr=2&w=265&h=216&fit=crop&q=50",
    university_img:
      "http://coursera-university-assets.s3.amazonaws.com/cc/61dbdf2c1c475d82d3b8bf8eee1bda/MSFT-stacked-logo_FINAL.png",
    university_name: "Microsoft",
    course_name: "Microsoft Power BI Data Analyst Professional Certificate",
  },
  {
    course_img:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://d15cw65ipctsrr.cloudfront.net/16/5e0361da674644abdad374133539d2/sparc_600.png?auto=format%2Ccompress%2C%20enhance&dpr=2&w=265&h=216&fit=crop&q=50",
    university_img:
      "http://coursera-university-assets.s3.amazonaws.com/89/63fef0315140268d5c0f66eee8e85e/VU_360x360.png",
    university_name: "Vanderbilt University",
    course_name: "Prompt Engineering Specialization",
  },
  {
    course_img:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://d396qusza40orc.cloudfront.net/phoenixassets/wharton-business-foundations/wharton-business-foundations-logo.jpg?auto=format%2Ccompress%2C%20enhance&dpr=2&w=265&h=216&fit=crop&q=50",
    university_img:
      "http://coursera-university-assets.s3.amazonaws.com/a2/66aaaad14d426fa9798ed714b3d0e5/UniversityofPennsylvania_Vertical_RGB_coursera-cert.png",
    university_name: "University of Pennsylvania",
    course_name: "Business Foundations Specialization",
  },
  {
    course_img:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://d2j5ihb19pt1hq.cloudfront.net/sdp_page/s12n_logos/python.jpg?auto=format%2Ccompress%2C%20enhance&dpr=2&w=265&h=216&q=50&fit=crop",
    university_img:
      "https://coursera-university-assets.s3.amazonaws.com/70/de505d47be7d3a063b51b6f856a6e2/New-Block-M-Stacked-Blue-295C_600x600.png",
    university_name: "University of Michigan",
    course_name: "Python for Everybody Specialization",
  },
  {
    course_img:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://d15cw65ipctsrr.cloudfront.net/c0/7c9805bdef4f32a8b7aef5b5ba465e/Specialization-Image_600x600.png?auto=format%2Ccompress%2C%20enhance&dpr=2&w=265&h=216&fit=crop&q=50",
    university_img:
      "http://coursera-university-assets.s3.amazonaws.com/e8/7cc3d09d3f11e698dfff46d35f2da1/Stanford_Coursera_Logo.png",
    university_name: "Stanford University",
    course_name: "AI in Healthcare",
  },
  {
    course_img:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://d15cw65ipctsrr.cloudfront.net/a4/0ee0209fb444a38ade1afccde6355e/option2.jpg?auto=format%2Ccompress%2C%20enhance&dpr=2&w=265&h=216&fit=crop&q=50",
    university_img:
      "http://coursera-university-assets.s3.amazonaws.com/0e/4bb2b81f8e453eab147bbb94bb53da/Intuit_Square_360x360_WhiteonBlue.png",
    university_name: "Intuit",
    course_name: "Intuit Academy Bookkeeping Professional Certificate",
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
    <>
      {" "}
      <p className="best-seller-course-title">Best seller courses</p>
      <div className="best-seller-course">
        <div className="best-seller-courses-container">
          <button className="custom_next">
            <i className="fa-solid fa-chevron-right">
              <NavigateNextIcon />
            </i>
          </button>
          <button className="custom_prev">
            <i className="fa-solid fa-chevron-left">
              <NavigateBeforeIcon />
            </i>
          </button>
          <Swiper
            modules={[Autoplay, Navigation, Pagination, A11y]}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            slidesPerGroup={1}
            spaceBetween={20}
            slidesPerView={1}
            navigation={{
              nextEl: ".custom_next",
              prevEl: ".custom_prev",
            }}
            pagination={{ clickable: true }}
            breakpoints={{
              640.02: {
                slidesPerView: 2,
              },
              768.02: {
                slidesPerView: 3,
              },
              1024.02: {
                slidesPerView: 4,
              },
            }}
          >
            {best_courses.map((course, id) => {
              return (
                <SwiperSlide key={id}>
                  <div className="course-item-swiper">
                    <div className="course-item-image">
                      <img src={course.course_img} alt="course-img" />
                    </div>
                    <div className="course-university">
                      <img
                        src={course.university_img}
                        alt="university-img"
                        width="25px"
                        height="25px"
                      />
                      <span>{course.university_name}</span>
                    </div>
                    <p className="course-name">{course.course_name}</p>
                    <div className="course-earn-degree">
                      <SchoolIcon />
                      <span>Earn a degree</span>
                    </div>
                    <p className="course-degree">Degree</p>
                  </div>
                </SwiperSlide>
              );
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
                  <img
                    src={course.university_img}
                    alt="university-img"
                    width="25px"
                    height="25px"
                  />
                  <span>{course.university_name}</span>
                </div>
                <p className="course-name">{course.course_name}</p>
                <div className="course-earn-degree">
                  <SchoolIcon />
                  <span>Earn a degree</span>
                </div>
                <p className="course-degree">Degree</p>
              </div>
            );
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
};

export default Courses;
