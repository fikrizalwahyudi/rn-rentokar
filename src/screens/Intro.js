import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import AppIntroSlider from 'react-native-app-intro-slider';
// import App from './App'

class Intro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showRealApp: false
        }
    }
    
    _onDone = () => {
        // User finished the introduction. Show real app through
        // navigation or simply by controlling state
        this.setState({ showRealApp: true });
        this.props.navigation.navigate('Login');
    }
    render() {
        
        return <AppIntroSlider slides={slides} onDone={this._onDone}/>;
        
    }
}

const styles = StyleSheet.create({
    image: {
        width: 320,
        height: 320,
    }
});

const slides = [
    {
        key: 'rentokar',
        // title: 'Title 1',
        text: 'Rentokar adalah platform sewa menyewa model marketplace untuk memenuhi kebutuhan anda, karena tidak semua kebutuhan anda harus dibeli, terkadang kita cukup menyewanya. \n Temukan, Pinjam dan Kembalikan',
        image: require('../assets/img/png/006-project.png'),
        imageStyle: styles.image,
        backgroundColor: '#59b2ab',
    },
    {
        key: 'find',
        // title: 'Title 2',
        text: 'Temukan barang yang ingin di sewa',
        image: require('../assets/img/png/005-seo.png'),
        imageStyle: styles.image,
        backgroundColor: '#febe29',
    },
    {
        key: 'rent',
        // title: 'Rocket guy',
        text: 'Sewa barang yang ingin di sewa',
        image: require('../assets/img/png/019-pay-per-click.png'),
        imageStyle: styles.image,
        backgroundColor: '#22bcb5',
    },
    {
        key: 'return',
        // title: 'Rocket guy',
        text: 'Kembalikan barang saat sudah tidak di perlukan tepat waktu',
        image: require('../assets/img/png/002-time-management.png'),
        imageStyle: styles.image,
        backgroundColor: '#22bcb5',
    }
];

export default Intro;
