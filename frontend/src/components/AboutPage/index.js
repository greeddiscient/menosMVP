
import React from 'react';
import NavBar from'../NavBar';
import './index.css';
import Footer from '../Footer';

export default class AboutPage extends React.Component {
  constructor(props){
    super(props)
  }
  testAuth(){
    if(window.IN.User.isAuthorized()){
      console.log(true)
    }
    else{
      this.lilogin()
    }


  }

  lilogin(){
    window.IN.UI.Authorize().params({"scope":["r_basicprofile", "r_emailaddress"]}).place();
    window.IN.Event.on(window.IN, 'auth', this.getProfileData.bind(this));
  }
  getProfileData(){
    var that=this
    window.IN.API.Profile("me").fields("id,firstName,lastName,email-address,picture-urls::(original),public-profile-url,location:(name)").result(function (me) {
        var profile = me.values[0];
        var id = profile.id;
        var firstName = profile.firstName;
        var lastName = profile.lastName;
        var emailAddress = profile.emailAddress;
        var pictureUrl = profile.pictureUrls.values[0];
        var profileUrl = profile.publicProfileUrl;
        var country = profile.location.name;
        localStorage.setItem('firstName', firstName)
        console.log('saved to localstorage during get profile', localStorage.getItem('firstName'))
        that.setState({
          profile: profile,
          firstName: firstName,
          lastName: lastName,
          emailAddress: emailAddress,
          pictureUrl: pictureUrl,
          profileUrl: profileUrl
        })
    })
    console.log("testwindow",window.profile)
  }

  render() {
    return (

      <div className="about">
      <NavBar/>
      <h1 className="about-header-label">Vision</h1>
      <div className="about-menos">

        <h1 className="about-believe">We Believe</h1>
        <p className="about-content">At Menos, we believe in the pursuit of excellence and reaching our fullest potential. We want to achieve our goals with integrity.
This would not be possible without role models that we respect in our lives. We need someone to guide us on the long and uncertain road to success. <br/><br/>Mentorship has been an ancient common theme in the symbols of our world. From the innate Father - Son relationship, to the classic Master - Apprentice discipleship, to war heroes such as Alexander the Great - Aristotle, and even to popular culture where Luke Skywalker seeks guidance from Obi Wan and Yoda before he goes on to save the universe, mentorship is everywhere. <br/><br/> Menos is our way of connecting you Indonesians to highly established mentors who will give you the best guidance for your quest. <br/><br/>Become the Strongest Version of Yourself!  </p>
      </div>
      <h1 className="founders-header-label">Meet the Founders</h1>
        <div className="founders">

          <div className="founder-window-ivander">
            <img src={require(`../../img/ivander-tee.jpg`)}/>
            <div className= "founder-details">
              <h2 className= "founder-name">Ivander Tee</h2>
              <h3 className= "founder-education">UC Berkeley &#39;17</h3>
              <h4 className= "founder-degree">B.S. Chemical Engineering</h4>
              <p className="founder-message"><i className="fa fa-quote-left founder-left-quote" aria-hidden="true"></i>Following someone means lowering your pride, which sometimes hurts. But slowly, you realize that your life is enriched, perhaps tremendously, by that person. At the end, it’s a trade-off between retaining your pride and getting an enriched life. And in this short little life, the latter always makes more sense to me.<i className="fa fa-quote-right founder-right-quote" aria-hidden="true"></i></p>
            </div>
          </div>

          <div className="founder-window-abyasa">
            <img src={require(`../../img/abyasa-kamdani.jpg`)}/>
            <div className= "founder-details">
              <h2 className= "founder-name">Abyasa Kamdani</h2>
              <h3 className= "founder-education">UC Berkeley &#39;18</h3>
              <h4 className= "founder-degree">B.A. Economics</h4>
              <p className="founder-message"><i className="fa fa-quote-left founder-left-quote" aria-hidden="true"></i>There are many things given to us in this life for the wrong reasons. What we do with such blessings, that is the true test of a man.<i className="fa fa-quote-right founder-right-quote" aria-hidden="true"></i></p>
            </div>
          </div>
          <div className="founder-window-shaun">
            <img src={require(`../../img/shaun-djuhari.jpg`)}/>
            <div className= "founder-details">
              <h2 className= "founder-name">Shaun Djuhari</h2>
              <h3 className= "founder-education">UC Berkeley &#39;16</h3>
              <h4 className= "founder-degree">B.S. Computer Science</h4>
              <p className="founder-message"><i className="fa fa-quote-left founder-left-quote" aria-hidden="true"></i>Here's to the crazy ones. The misfits. The rebels. The ones who see things differently. You can quote them, disagree with them, glorify or villify them. But the only thing you can't do is ignore them. Because the people who are crazy enough to think they can change the world, are the ones who do.<i className="fa fa-quote-right founder-right-quote" aria-hidden="true"></i></p>
            </div>
          </div>

        </div>
        <Footer/>
      </div>
    );
  }
}
