import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
        paddingHorizontal: 10,
    },
    searchInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        backgroundColor: 'lightgrey'
    },
    restaurantItem: {
        marginBottom: 20,
        backgroundColor: '#f9f9f9',
        padding: 10,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    restaurantName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333',
    },
    restaurantAddress: {
        fontSize: 16,
        color: '#666',
        marginBottom: 5,
    },
    restaurantDistance: {
        fontSize: 14,
        color: '#666',
        marginBottom: 10,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 8,
    },
    image404: {
        width: 200,
        height: 200,
        alignSelf: 'center'
    },
    favoriteButton: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'blue',
        marginTop: 10,
        textAlign: 'center',
    },
    favoriteIcon: {
        marginLeft: 5,
    },
});

export default styles;