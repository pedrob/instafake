import React, { Component } from 'react';
import * as api from "../../actions/api";
import ImageList from './components/ImageList';
import "../../styles/profile.css";

export default class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
          user: null,
          profileImage: "",
          images: []
        };
      }
    
      componentDidMount() {
        const userId = this.props.match.params.id;
        this.fetchUser(userId);
      }
    
      fetchUser = (id) => {
        const user = api.user(id).then(res => {
            return res.data;
        });
        user.then(result =>
          this.setState(() => ({
            user: result[0],
            profileImage: this.imageSource(result[1].imageData),
            images: this.profileImages(result),
          }))
        );
      };
    
      imageSource = (dataImg) => {
          return `data:image/png;base64,${dataImg}`
      }

      profileImages = (dataArray) => {
          return dataArray.slice(2);
      }

  render() {
    const { user, profileImage, images } = this.state;
    return (
        <>
            {!!user && (
                <div className="container">
                    <div className="row mt-5 pb-5 justify-content-start">
                        <div className="col-4 ml-4">
                            <div className="profile-image-frame">
                                <img src={profileImage} />
                            </div>
                        </div>
                        <div className="col-4 ml-4">
                            <h1 className="profile-nick">{user.name}</h1>
                            <p className="profile-name">Teste</p>
                            <p className="profile-defenition">Professional Serial Killer</p>
                        </div>
                    </div>
                    <div className="row diviser">
                        <div>PUBLICAÇÕES</div>
                    </div>
                    <div className="row m-0 p-0 justify-content-center">
                        {images.length === 0 ? (
                        <div>Sem publicações...</div>
                        ) : (
                        <ImageList images={images} />
                        )}
                    </div>
                </div>
            )}
        </>
    );
  }
}
