import React, { Component } from 'react';
import { Segment, Input, Header, Message, Button, Form } from 'semantic-ui-react';
import Layout from '../components/Layout';
import record from '../ethereum/record';
import web3 from '../ethereum/web3';

class RevokeDoctor extends Component {
    state = {
        doctorAddr: '',
        loading: '',
        errorMessage: '' 
    };

    onSubmit = async event => {
        event.preventDefault();

        this.setState({loading: true, errorMessage: ''});

        try {
            const accounts = await web3.eth.getAccounts();

            await record.methods.RevokePermission(this.state.doctorAddr).send({ from: accounts[0] });

            alert("Permission Revoked Successfully!");
        }
        catch (err) {
            this.setState({ errorMessage: err.message });
        }

        this.setState({ loading: false, doctorAddr: ''});
    }

    render() {
        return (
            <Layout>
                <Segment>
                    <Header
                            as='h2'
                            content='禁止访问'
                            subheader='撤销对医生或病人查看记录的许可'
                    ></Header>
                    <Input 
                        fluid
                        placeholder = "医师账户地址"
                        value= {this.state.doctorAddr}
                        onChange= {event => 
                            this.setState({ doctorAddr: event.target.value })}  
                    /><br/>
                    <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                        <Message error header="Oops!" content={this.state.errorMessage}/>
                        <Button primary loading={this.state.loading}>撤销</Button>
                    </Form>
                </Segment>
            </Layout>
        );
    }
}

export default RevokeDoctor;