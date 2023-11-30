import SchoolIcon from "@mui/icons-material/School";
const LandingPageCourses = () => {
  return (
    <div className="courses-container">
      <div className="courses">
        <div className="course-item">
          <div className="course-item-image">
            <img
              src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera_assets/ddp/branding/illinois/iMBA+square.jpg?auto=format%2Ccompress%2C%20enhance&dpr=2&w=265&h=204&fit=crop&q=50"
              alt="course-img"
            />
          </div>
          <div className="course-university">
            <img
              src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/http://coursera-university-assets.s3.amazonaws.com/d8/42cdc0ab2011e8b910bdf80bed9f6c/CenterILblock-ISQUAREOrangeBackgrnd.png?auto=format%2Ccompress&dpr=2&w=25&h=25&q=40"
              alt="university-img"
              width="25px"
              height="25px"
            />
            <span>University of Illinois Gies College of Business</span>
          </div>
          <p className="course-name">
            Master of Business Administration (iMBA)
          </p>
          <div className="course-earn-degree">
            <SchoolIcon />
            <span>Earn a degree</span>
          </div>
          <p className="course-degree">Degree</p>
        </div>
        <div className="course-item">
          <div className="course-item-image">
            <img
              src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera_assets/ddp/branding/ms-management-illinois/thumbnail.jpg?auto=format%2Ccompress%2C%20enhance&dpr=2&w=265&h=204&fit=crop&q=50"
              alt="course-img"
            />
          </div>
          <div className="course-university">
            <img
              src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/http://coursera-university-assets.s3.amazonaws.com/d8/42cdc0ab2011e8b910bdf80bed9f6c/CenterILblock-ISQUAREOrangeBackgrnd.png?auto=format%2Ccompress&dpr=2&w=25&h=25&q=40"
              alt="university-img"
              width="25px"
              height="25px"
            />
            <span>University of Illinois Urbana-Champaign</span>
          </div>
          <p className="course-name">Master of Science in Management (iMSM)</p>
          <div className="course-earn-degree">
            <SchoolIcon />
            <span>Earn a degree</span>
          </div>
          <p className="course-degree">Degree</p>
        </div>
        <div className="course-item">
          <div className="course-item-image">
            <img
              src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera_assets/ddp/branding/imsa/imsa-thumbnail.jpg?auto=format%2Ccompress%2C%20enhance&dpr=2&w=265&h=204&fit=crop&q=50"
              alt="course-img"
            />
          </div>
          <div className="course-university">
            <img
              src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/http://coursera-university-assets.s3.amazonaws.com/d8/42cdc0ab2011e8b910bdf80bed9f6c/CenterILblock-ISQUAREOrangeBackgrnd.png?auto=format%2Ccompress&dpr=2&w=25&h=25&q=40"
              alt="university-img"
              width="25px"
              height="25px"
            />
            <span>Gies College of Business at the University of Illinois</span>
          </div>
          <p className="course-name">Master's of Accounting (iMSA)</p>
          <div className="course-earn-degree">
            <SchoolIcon />
            <span>Earn a degree</span>
          </div>
          <p className="course-degree">Degree</p>
        </div>
        <div className="course-item">
          <div className="course-item-image">
            <img
              src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera_assets/ddp/branding/me-engineering-management-boulder/7f1ba63f-ce16-4c29-9690-557ac3eb3168.jpg?auto=format%2Ccompress%2C%20enhance&dpr=2&w=265&h=204&fit=crop&q=50"
              alt="course-img"
            />
          </div>
          <div className="course-university">
            <img
              src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/http://coursera-university-assets.s3.amazonaws.com/a6/7035b7e00b401383be4e5856b8bdaa/Boulder-FL-VERT-B---cropped.png?auto=format%2Ccompress&dpr=2&w=25&h=25&q=40"
              alt="university-img"
              width="25px"
              height="25px"
            />
            <span>University of Colorado Boulder</span>
          </div>
          <p className="course-name">
            Master of Engineering in Engineering Management
          </p>
          <div className="course-earn-degree">
            <SchoolIcon />
            <span>Earn a degree</span>
          </div>
          <p className="course-degree">Degree</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPageCourses;
