import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Form, Input, Button } from 'antd';

const FormItem = Form.Item;

class CustomForm extends React.Component {

    handleFormSubmit = (event, requestType, articleID) => {
        const title = event.target.elements.title.value;
        const content = event.target.elements.content.value;
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: this.props.token
        }

        // eslint-disable-next-line
        switch (requestType) {
            case 'post':
                return axios.post("http://127.0.0.1:8000/api/", {
                    title: title,
                    content: content
                })
                    .then(res => console.log(res))
                    .catch(error => console.err(error));
            case 'put':
                return axios.put(`http://127.0.0.1:8000/api/${articleID}/`, {
                    title: title,
                    content: content
                })
                    .then(res => console.log(res))
                    .catch(error => console.err(error));
        }
    }

    render() {
        return (
            <div>
                <Form onSubmit={(event) => this.handleFormSubmit(
                    event,
                    this.props.requestType,
                    this.props.articleID,
                )}>
                    <FormItem label="Title">
                        <Input name="title" placeholder="Write a title" />
                    </FormItem>
                    <FormItem label="Content">
                        <Input name="content" placeholder="Enter the content" />
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit">{this.props.btnText}</Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
      token: state.token
    }
}

export default connect(mapStateToProps)(CustomForm);
