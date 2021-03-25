import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import ImageForm from './components/ImageForm/ImageForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Particles from 'react-particles-js';




const initialState = {
  input: '',
    imageUrl: '',
    box: {},
    route: 'signin',
    isSignedin: false,

    user: {
      id: '',
      name: '',        
      email: '',
      entries: '',
      joined:''
    }
}

class App extends Component {
  constructor() {
    super()
    this.state = initialState 
  }

  loadUser = (data) => {
    this.setState({ user: {
      id: data.id,
      name: data.name,      
      email: data.email,
      entries: data.entries,
      joined:data.joined
    }})
  }

  

  createFaceBox = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('imageUrl')
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: width* clarifaiFace.left_col,
      rightCol: width - (width * clarifaiFace.right_col),
      topRow: height * clarifaiFace.top_row,
      bottomRow: height - ( height *clarifaiFace.bottom_row)    
    }    
  };

  displayBox = (box) => {
    this.setState({ box: box})
  }



  onInputChange = (event) => {
    this.setState({ input: event.target.value })
  }

  onButtonChange = (event) => {    
    this.setState({ imageUrl: this.state.input })

      fetch('http://localhost:3001/imageUrl', {
        method: 'post',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
          input: this.state.input
        })
      })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('http://localhost:3001/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
          .then(res =>  res.json())
          .then(entries => {
            this.setState( Object.assign(this.state.user, {entries: entries}))
          })
          .catch(('Unable tio fetch clarifai'))
        }
        this.displayBox(this.createFaceBox(response))
      })        
      .catch(err => console.log('nooo'))           
  }

  onRouteChange = (route) => {
    if (route === 'signin' || route === 'register') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({ isSignedin: true })
    }
    this.setState({ route: route })
  }

  render() {
    return (
      <div className="App">
        <div>
          <Particles
          params = {particlesOptions} 
          className='particles' />
          <Navigation onRouteChange={this.onRouteChange} isSignedin={this.state.isSignedin}/>
          { this.state.route === 'home' ?            
            <div>
              <Logo />
              <Rank name={this.state.user.name} entries={this.state.user.entries}/>
              <ImageForm onInputChange ={this.onInputChange} onButtonChange={this.onButtonChange}/>
              <FaceRecognition isSignedin ={this.state.isSignedin} box= {this.state.box} imageUrl={this.state.imageUrl}  />
            </div>
            :  (
              this.state.route === 'signin'
              ?<Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
              :<Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              )
            
          }
          
        </div>
      </div>
    );
  }  
}
const particlesOptions = {
      "particles": {
          "number": {
              "value": 160,
              "density": {
                  "enable": false
              }
          },
          "size": {
              "value": 10,
              "random": true
          },
          "move": {
              "direction": "bottom",
              "out_mode": "out"
          },
          "line_linked": {
              "enable": false
          }
      },
      "interactivity": {
          "events": {
              "onclick": {
                  "enable": true,
                  "mode": "remove"
              }
          },
          "modes": {
              "remove": {
                  "particles_nb": 10
              }
          }
      }
  } 

export default App;
