import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image
} from "react-native";

import StarRating from 'react-native-star-rating'

class ItemReference extends Component {
    render() {
        return (
             <View style={{ backgroundColor:"white", marginBottom:10,width: 150, height: 150, borderWidth: 0.5, borderColor: '#dddddd', marginRight :10 }}>
                <View style={{ flex: 1 }}>
                    <Image
                        style={{ flex: 1, width: null, height: null, resizeMode: 'cover' }}
                        source={require('../../../../assets/img/home.jpg')} />
                </View>
                <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'space-evenly', paddingLeft: 10 }}>
                    <Text style={{ fontSize: 10, color: '#b63838' }}>{this.props.type}</Text>
                    <Text style={{ fontSize: 12, fontWeight: 'bold' }}>{this.props.name}</Text>
                    <Text style={{ fontSize: 10 }}>{this.props.price}$</Text>
                    <StarRating
                        disable={true}
                        maxStars={5}
                        rating={this.props.rating}
                        starSize={10}

                    />
                </View>
            </View>
        );
    }
}
export default ItemReference;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});