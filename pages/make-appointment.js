import React, { Component } from 'react';
import { Divider, Form, Input, Button, Segment, Message, Select } from 'semantic-ui-react';
import Layout from '../components/Layout';
import record from '../ethereum/record';
import web3 from '../ethereum/web3';

const statusOptions = [
    { key: 'p', text: '待处理', value: 'Pending' },
    { key: 'c', text: '完成', value: 'Complete' }
]

class MakeAppointment extends Component {
    state = {
        patientaddr: '',
        date: '',
        time: '',
        prescription: '',
        description: '',
        diagnosis: '',
        status: '',
        errorMessage: ''
    };

    handleStatus = (e, { value }) => this.setState({ status: value })

    onSubmit = async event => {
        event.preventDefault();

        const { patientaddr, date, time, diagnosis, prescription, description, status } = this.state;

        this.setState({loading: true, errorMessage: ''});

        try {
            const accounts = await web3.eth.getAccounts();

            await record.methods.setAppointment(
                patientaddr, date, time, diagnosis, prescription, description, status
            ).send({ from: accounts[0] });

            alert("成功创建会诊!");
        }
        catch (err) {
            this.setState({ errorMessage: err.message });
            alert("An error has occured");
        }

        this.setState({ loading: false, patientaddr: '', date: '', time: '', prescription: '', description: '', diagnosis: '', status: ''});
    }

    render() {
        return (
            <Layout>
                <Segment padded><h1>创建会诊</h1></Segment>
                <Segment>
                <h2 style={{ marginTop: '20px', marginBottom: '30px'}}>会诊信息</h2>
                <Divider clearing />
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Group widths='equal'>
                        <Form.Field>
                            <label>患者账户地址</label>
                            <Input
                                placeholder = 'Eg. 0xF6973b46412ff52c1BfDB783D29e5218620Be542'                
                                value= {this.state.patientaddr}
                                onChange= {event => 
                                    this.setState({ patientaddr: event.target.value })}                           
                            />
                        </Form.Field>

                    </Form.Group>

                    <br/> 
                    <Form.Group widths='equal'>
                    <Form.Field>
                            <label>日期</label>
                            <Input
                                placeholder = 'Eg. 2023/4/10'                        
                                value= {this.state.date}
                                onChange= {event => 
                                    this.setState({ date: event.target.value })}                           
                            />
                        </Form.Field>

                        <Form.Field>
                            <label>时间</label>
                            <Input
                                placeholder = 'Eg. 10:30am'
                                value= {this.state.time}
                                onChange= {event => 
                                    this.setState({ time: event.target.value })}  
                            />
                        </Form.Field>
                    
                        <Form.Field 
                            label='状态' 
                            control={Select} 
                            options={statusOptions} 
                            onChange={this.handleStatus}
                        />
                    </Form.Group> 

                    <br/>
                    <h2 style={{ marginTop: '20px', marginBottom: '30px'}}>医疗信息</h2>
                    <Divider clearing />             
                    <Form.TextArea
                            label='处方'
                            placeholder = 'Eg. 阿司匹林，一次0.3～0.6g，一日3次，必要时每4小时1次；'
                            value= {this.state.prescription}
                            onChange= {event => 
                                this.setState({ prescription: event.target.value })} 
                    />
                    
                    <br/>
                    <Form.TextArea
                                label='诊断'
                                placeholder = 'Eg. 皮肤感染'
                                value= {this.state.diagnosis}
                                onChange= {event => 
                                    this.setState({ diagnosis: event.target.value })}  
                    />             
                    <br/>
                    <Form.TextArea
                                label='注意事项'
                                placeholder = 'Eg. 仍然需要进一步观察'
                                value= {this.state.description}
                                onChange= {event => 
                                    this.setState({ description: event.target.value })}  
                    />      

                    <br/>
                    <Message error header="Oops!" content={this.state.errorMessage}/>
                    <Button primary loading={this.state.loading}>创建</Button>
                </Form>
                </Segment>
            </Layout>
        );
    }
}

export default MakeAppointment;