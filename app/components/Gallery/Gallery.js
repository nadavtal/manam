import React from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import Lightbox from "react-image-lightbox";
import "./index.css";

const images = [
  "https://mdbootstrap.com/img/Others/documentation/img%20(145)-mini.jpg",
  "https://mdbootstrap.com/img/Others/documentation/img%20(150)-mini.jpg",
  "https://mdbootstrap.com/img/Others/documentation/img%20(152)-mini.jpg",
  "https://mdbootstrap.com/img/Others/documentation/img%20(42)-mini.jpg",
  "https://mdbootstrap.com/img/Others/documentation/img%20(151)-mini.jpg",
  "https://mdbootstrap.com/img/Others/documentation/img%20(40)-mini.jpg",
  "https://mdbootstrap.com/img/Others/documentation/img%20(148)-mini.jpg",
  "https://mdbootstrap.com/img/Others/documentation/img%20(147)-mini.jpg",
  "https://mdbootstrap.com/img/Others/documentation/img%20(149)-mini.jpg"
];

const smallImages = [
  "https://mdbootstrap.com/img/Others/documentation/img%20(145)-mini.jpg",
  "https://mdbootstrap.com/img/Others/documentation/img%20(150)-mini.jpg",
  "https://mdbootstrap.com/img/Others/documentation/img%20(152)-mini.jpg",
  "https://mdbootstrap.com/img/Others/documentation/img%20(42)-mini.jpg",
  "https://mdbootstrap.com/img/Others/documentation/img%20(151)-mini.jpg",
  "https://mdbootstrap.com/img/Others/documentation/img%20(40)-mini.jpg",
  "https://mdbootstrap.com/img/Others/documentation/img%20(148)-mini.jpg",
  "https://mdbootstrap.com/img/Others/documentation/img%20(147)-mini.jpg",
  "https://mdbootstrap.com/img/Others/documentation/img%20(149)-mini.jpg"
];

class LightboxPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      photoIndex: 0,
      isOpen: false
    };
  }



  render() {
    console.log(this.props)
    const { photoIndex, isOpen } = this.state;
    return (
      <MDBContainer>
        <div className="mdb-lightbox no-margin">
          <MDBRow>
            {this.props.images.map( (image, index) => {
              return (
                <MDBCol md="2" key={index}>
                  <figure>
                    <img
                      src={image.url}
                      alt="Gallery"
                      className="img-fluid p-1"
                      onClick={() =>
                        this.setState({ photoIndex: index, isOpen: true })
                      }
                    />
                  </figure>
                </MDBCol>
              )
            })}
            </MDBRow>

        </div>
        {isOpen && (
          <Lightbox
            mainSrc={this.props.images[photoIndex].url}
            nextSrc={this.props.images[(photoIndex + 1) % this.props.images.length].url}
            prevSrc={this.props.images[(photoIndex + this.props.images.length - 1) % this.props.images.length].url}
            imageTitle={photoIndex + 1 + "/" + this.props.images.length}
            onCloseRequest={() => this.setState({ isOpen: false })}
            onMovePrevRequest={() =>
              this.setState({
                photoIndex: (photoIndex + this.props.images.length - 1) % this.props.images.length
              })
            }
            onMoveNextRequest={() =>
              this.setState({
                photoIndex: (photoIndex + 1) % this.props.images.length
              })
            }
          />
        )}
      </MDBContainer>
    );
  }
}

export default LightboxPage;
