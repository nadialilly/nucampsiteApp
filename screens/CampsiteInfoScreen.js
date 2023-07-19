import React from "react";
import { FlatList, StyleSheet, Text, View, Modal, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Icon, Input, Rating } from "react-native-elements";
import { useState } from "react";
import RenderCampsite from "../features/campsites/RenderCamspite";
import { toggleFavorite } from "../features/favorites/favoritesSlice";
import { postComment } from "../features/comments/commentsSlice";


const CampsiteInfoScreen = ({ route }) => {
    const { campsite } = route.params;
    const comments = useSelector((state) => state.comments);
    const favorites = useSelector((state) => state.favorites);
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [rating, setRating] = useState(5);
    const [author, setAuthor] = useState('');
    const [text, setText] =useState('')
    
    const handleSubmit = () => {
        const newComment = {
            campsiteId: campsite.id,
            rating,
            author,
            text
        };
        dispatch(postComment(newComment));
        setShowModal(!showModal);
    };

    const resetForm = () => {
        setRating(5);
        setAuthor('');
        setText('')
    };

    const renderCommentItem = ({item}) => {
        return (
            <View style={styles.commentItem} >
                <Text style={{ fontSize: 14 }}>{item.text}</Text>
                <Rating 
                    style={{ fontSize: 12, paddingVertical: '5%', alignItems:'flex-start' }}
                    type='star'
                    readonly
                    imageSize={10}
                    startingValue={item.rating}
                >{item.rating} Stars</Rating>
                <Text style={{ fontSize: 12 }}>{`--${item.author}, ${item.date}`}</Text>
            </View>
        )
    };

    return (
        <>
        <FlatList
            data={comments.commentsArray.filter(
                (comment) => comment.campsiteId === campsite.id
            )}
            renderItem={renderCommentItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{
                marginHorizontal: 20,
                paddingVertical: 20
            }} 
            ListHeaderComponent={
                <>  
                    <RenderCampsite 
                    campsite={campsite} 
                    isFavorite={favorites.includes(campsite.id)}
                    markFavorite={() => dispatch(toggleFavorite(campsite.id))}
                    onShowModal={() => setShowModal(!showModal)}
                    />
                    <Text style={styles.commentsTitle}>Comments</Text>
                </>
            }
        />
    
           <Modal
                animationType='slide'
                transparent={false}
                visible={showModal}
                onRequestClose={() => setShowModal(!showModal)}
            >
               <View style={styles.modal}>
                    <Rating 
                        showRating
                        startingValue={rating}
                        imageSize={40}
                        onFinishRating={(rating) => setRating(rating)}
                        style={{paddingVertical: 10}}
                    />
                    <Input 
                        placeholder="Author"
                        leftIcon={{type:'font-awesome', name:'user-o'}}
                        leftIconContainerStyle={{paddingRight: 10}}
                        onChangeText={(author) => setAuthor(author)}
                        value={author}
                    />
                    <Input 
                        placeholder="Comment"
                        leftIcon={{type:'font-awesome', name:'comment-o'}}
                        leftIconContainerStyle={{paddingRight: 10}}
                        onChangeText={(text) => setText(text)}
                        value={text}
                    />
                    <View style={{margin: 10}}>
                        <Button 
                            title='Submit'
                            color='#5637DD'
                            onPress={() => {
                                handleSubmit();
                                resetForm();
                            }}
                        />
                    </View>
                    <View style={{margin: 10}}>
                        <Button 
                            onPress={() => {
                                setShowModal(!showModal);
                                resetForm()
                            }}
                            color= '#808080'
                            title='Cancel'
                        />
                    </View>
                </View> 
            </Modal> 
        </>
    )
};

const styles = StyleSheet.create({
    commentsTitle: {
        textAlign: 'Center',
        backgroundColor: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#43484D',
        padding: 10,
        paddingTop: 30
    },
    commentItem: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#fff'
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    }
})

export default CampsiteInfoScreen;
