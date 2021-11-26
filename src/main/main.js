import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import './main.css';
import Items from './items/items';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import ClearIcon from '@mui/icons-material/Clear';
import { connect } from 'react-redux'
import debounce from 'lodash.debounce';

class MainPage extends React.Component {
    constructor() {
        super();
        this.debounceApiCall = debounce(this.debounceApiCall, 1000);
    }

    debounceApiCall = (value) => {
        this.props.callApi(value);

    }

    onInputChange = (event) => {
        this.props.handleChange(event);
        if (event.target.value !== '') {
            this.props.onLoading(true);
            this.debounceApiCall(event);
        } else {
            this.props.clearData()
        }
    }

    render() {
        const data = this.props.data || []
        return ( 
                <div className="full-height">
                    <div className="search-container">
                        <div className="search-input">
                            <SearchIcon  className="icon search-icon"></SearchIcon> 
                            <input placeholder="Search..." type= 'text' value = { this.props.inputValue } onChange = { this.onInputChange }/> 
                            {this.props.inputValue !== '' ? (
                                <ClearIcon className="icon clear-icon" onClick={this.props.clearData}></ClearIcon>) : '' }
                        </div>
                    </div>
                    {data.length === 0 && !this.props.progress ? (  
                        <div className="empty-placeholder">
                            <div className="placeholder-items">
                                <p>Welcome to wikipedia search</p>
                                <span>Search for any information you want on Wikipedia</span>
                            </div>
                        </div> ): '' }
                    {this.props.progress ? (  
                         <div className="empty-placeholder">
                            <CircularProgress color="inherit"/>
                        </div>): '' }

                    <div className="cards-container">
                        {data.map((item, i) =>
                            <div className="item">
                                <Items dataParentToChild={item}  key={i} ></Items>
                            </div>)}
                    </div>
                </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
            inputValue: state.inputValue,
            data: state.data,
            progress: state.progress
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        handleChange: (event) => {
                    const action = {
                        type: 'INPUT_CHANGED',
                        value: event.target.value
                    };
                    dispatch(action);
        },
        callApi: (event) => {
                const params = {
                    action: "query",
                    list: "search",
                    srsearch: event.target.value,
                    format: "json"
                }
                const url = "https://en.wikipedia.org/w/api.php";
                return axios.get(url + "?origin=*", {params: params}).then((response) => {
                        dispatch({type: 'PROGRESS', value: false })
                        dispatch({type: 'SEARCH_VALUES', value: response.data.query.search});

                    }).catch((error) => {
                        console.log(error)
                    })
        }, 
        clearData: () => {
            dispatch({type: 'CLEAR_SEARCH_VALUES', value: []})
            dispatch({type: 'INPUT_CHANGED', value: ''})


        },
        onLoading: (value) => {
            dispatch({type: 'PROGRESS', value: value })
        }
    }

}


export default connect(mapStateToProps, mapDispatchToProps)(MainPage);