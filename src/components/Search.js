import React, { useState, useEffect , useCallback } from 'react'
import { FlatList, StyleSheet, TouchableOpacity, TextInput , Keyboard  , TouchableWithoutFeedback, View , Image, ActivityIndicator, Text} from 'react-native'
import { connect } from 'react-redux';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
const actions = require('../redux/actions/giphy.actions')
import FastImage from 'react-native-fast-image';

let timeOutId;
const debounce=(func, delay) => {
return (...args) => {
    if(timeOutId){clearTimeout(timeOutId)}
    timeOutId = setTimeout(()=>{
        func.apply(null , args)
    },delay)
}
}
const Search = (props) => {
const [searchText, setSearchText] = useState('');

useEffect(() => {
props.resetCurrentPage();
if(props.gifsResult.length==0){
    props.setloading(true)
    props.loadGifs(1 , props.gifsResult)}
}, [])
let imageCard=(item)=>{
    return (
        <View style={styles.imageCardStyle}>
            <FastImage
        style={styles.image}
        source={{
        uri:item.item.images.fixed_height.url,
        headers: { Authorization: 'token' },
        priority: FastImage.priority.high,
        cache: FastImage.cacheControl.immutable,
        }}
        />
        </View>
    )
}
let LoadMore=()=>{
    return(searchText!=='' && !props.loading && props.gifsResult.length==0?null: <TouchableOpacity onPress={()=>handleOnEndReach()} style={{flex:1 ,alignItems:'center' ,paddingTop:15}}>
        {!props.loadMore?<EvilIcons name="chevron-down" size={50} color={'white'}/>:<ActivityIndicator size="large" color="white" />}
    </TouchableOpacity>)
}
const handleOnEndReach= async()=>{
    if((props.gifsResult.length!==0 )){
        props.setLoadMore(true)
        if(searchText==''){
        await props.loadGifs(props.currentPage+1 , props.gifsResult)}
        else { await props.searchGifs(props.currentPage+1 ,props.gifsResult , searchText )}
        props.increaseCurrentPage()
        props.setLoadMore(false)
    }
}

const mydebounce = useCallback(debounce((currentPage , prevData ,text) =>{
    onSearchTextChange(currentPage , prevData ,   text )}, 500), []);

let onSearchTextChange= async( currentPage, prevData , text )=> {
    if(!props.loading){
    props.setloading(true)}
    await props.searchGifs(1, [] , text)
    props.setloading(false)
}

let emptyList = (text) => {
    return (
        <View style={styles.emptyList}>
            <Text style={{ fontSize: 17, justifyContent: 'center', textAlign: 'center' , color:'white'}}>{text}</Text>
        </View>
    )
}


const onClearPress = () => {
    Keyboard.dismiss();
    setSearchText('')
    props.resetCurrentPage();
    props.loadGifs(1 , [])
}

return ( 
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} > 
    <View style={styles.parentView}>
        <View style={styles.searchBox}>
            <EvilIcons name='search' size={32}   color={'black'} />
            <TextInput
                selectionColor={'black'}
                placeholder='Type here...'
                placeholderTextColor="black" 
                style={[styles.searchBar, { fontSize: 18 }]}
                onChangeText={(text) => {
                    if(!props.loading){
                    props.setloading(true)
                }
                    setSearchText(text)
                    if (searchText!=='') {
                        mydebounce(1 , [],  searchText)
                    }
                    else if(searchText==''){
                        props.loadGifs(1,[])
                    }
                }}
                value={searchText == "" ? null : searchText}
            />
            <TouchableWithoutFeedback onPress={()=>onClearPress()}>
            <EvilIcons name='close' size={30} style={{paddingRight: 5 , color:'black' }}  />
            </TouchableWithoutFeedback>
        </View>
        
        {!props.loading ? <View style={{ alignItems:'center'}}><FlatList 
        data={props.gifsResult} 
        renderItem={(item) => imageCard(item)}
        numColumns={2}
        onEndReachedThreshold={0}
        contentContainerStyle={{ paddingBottom:50}}
        ListFooterComponent={()=><LoadMore/>}
        onMomentumScrollEnd={() => handleOnEndReach()}
        ListEmptyComponent={() => emptyList("No data available , try searching something else!")}
        /> 
        
        </View>
        :<View style={{flex:1 , height:800 }}><ActivityIndicator size="large" color="white" /></View>}
        
    
        </View> 
    </TouchableWithoutFeedback>
)
}

const styles = StyleSheet.create({
imageCardStyle:{
    margin:5 , 
    borderRadius:10 ,
},
image:{
    height:180 ,
    width:180 ,
    borderWidth: 3,
    borderRadius:10

    },
parentView: {
    flex: 1,
    backgroundColor:'black',
    height: "100%" 
},
searchBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 6,
    marginHorizontal: 10,
    marginVertical: 25,
    elevation: 3,
    height:60 , 
    backgroundColor:'white',
    alignContent:'center' ,
    alignItems:'center'
},
searchBoxIcon: {
    alignSelf: 'center',
},
searchBar: {
    width: "75%",
    color:'black'
},
emptyList: {
    alignItems: 'center',
    marginHorizontal: 20 , 
    height:800
},
scrollTopButton: {
    position: 'relative',
    bottom: 200,
    left: 130 , 
    height:60 ,
    width:60 , 
    opacity:0.8 ,
    backfaceVisibility:'visible' ,
    backgroundColor:'white' ,
    justifyContent:'center' ,
    alignContent:'center' ,
    alignItems:'center' ,

    // top:100
    // marginBottom:100
  },

})

const mapStateToProps = state => {
return {
    loading: state.gifReducer.loading,
    gifsResult:state.gifReducer.gifsResult,
    gifsLoaded:state.gifReducer.gifsLoaded,
    currentPage:state.gifReducer.currentPage,
    loadMore:state.gifReducer.loadMore
}

}
const dispatchStateToProps = (dispatch) => {
return {
    setloading: (val) => dispatch(searchActions.setloading(val)),
    loadGifs:(currentPage , prevData)=>dispatch(actions.loadGifs(currentPage , prevData)),
    increaseCurrentPage :()=>dispatch(actions.increaseCurrentPage()) ,
    resetCurrentPage :()=>dispatch(actions.resetCurrentPage()),
    setloading:(val)=>dispatch(actions.setloading(val)),
    searchGifs:( currentPage, prevData, text)=>dispatch(actions.searchGifs(currentPage, prevData, text)) ,
    setLoadMore:(val)=>dispatch(actions.setLoadMore(val))
}
}

export default connect(mapStateToProps, dispatchStateToProps)(Search)
