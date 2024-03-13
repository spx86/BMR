import React, { Component } from 'react';
import { Divider, Form, Input, Button, Segment, Message, Select} from 'semantic-ui-react';
import Layout from '../components/Layout';
import record from '../ethereum/record';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

const options = [
    { key: 'm', text: '男性', value: 'Male' },
    { key: 'f', text: '女性', value: 'Female' },
    { key: 'o', text: '其他', value: 'Other' },
]

const allergyOptions = [
    { key: 'f', text: '食物', value: 'Food' },
    { key: 'm', text: '药物', value: 'Medical' },
    { key: 'e', text: '环境', value: 'Environmental' },
    { key: 'o', text: '其他', value: 'Others' },
]

class RegisterPatient extends Component {
    state = {
        ic: '',
        name: '',
        phone: '',
        gender: '',
        dob: '',
        height: '',
        weight: '',
        houseaddr: '',
        bloodgroup: '',
        allergies: '',
        medication: '',
        emergencyName: '',
        emergencyContact: '',
        loading: false,
        errorMessage: ''
    };

    handleGender = (e, { value }) => this.setState({ gender: value })

    handleAllergies = (e, { value }) => this.setState({ allergies: value })

    onSubmit = async event => {
        event.preventDefault();

        const { ic, name, phone, gender, dob, height, weight, houseaddr, bloodgroup, allergies, medication, emergencyName, emergencyContact } = this.state;

        this.setState({loading: true, errorMessage: ''});

        try {
            const accounts = await web3.eth.getAccounts();

            await record.methods.setDetails(
                ic, name, phone, gender, dob, height, weight, houseaddr, bloodgroup, allergies, medication, emergencyName, emergencyContact
            ).send({ from: accounts[0] });

            alert("账户创建成功！");
            Router.pushRoute('/list');
        }
        catch (err) {
            this.setState({ errorMessage: err.message });
            alert("账号已存在！");
        }

        this.setState({ loading: false, ic: '', name: '', phone: '', gender: '', dob: '', height: '', weight: '', houseaddr: '', bloodgroup: '', allergies: '', medication: '', emergencyName: '', emergencyContact: ''});
    }

    render() {
        return (
            <Layout>
                <Segment padded><h1>创建新记录</h1></Segment>
                <Segment>
                <h2 style={{ marginTop: '10px', marginBottom: '30px'}}>主要信息</h2>
                <Divider clearing />
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Group widths='equal'>
                        <Form.Field>
                            <label>ID</label>
                            <Input
                                placeholder = 'Eg. 410728********5600'                
                                value= {this.state.ic}
                                onChange= {event => 
                                    this.setState({ ic: event.target.value })}                           
                            />
                        </Form.Field>

                        <Form.Field>
                            <label>姓名</label>
                            <Input
                                placeholder = 'Eg. 张三'                        
                                value= {this.state.name}
                                onChange= {event => 
                                    this.setState({ name: event.target.value })}                           
                            />
                        </Form.Field>

                        <Form.Field>
                            <label>电话</label>
                            <Input
                                placeholder = 'Eg. 18888888888'
                                value= {this.state.phone}
                                onChange= {event => 
                                    this.setState({ phone: event.target.value })}  
                            />
                        </Form.Field>
                    </Form.Group>
                    <br/>              
                    <Form.Group widths='equal'>
                        <Form.Field 
                                label='性别' 
                                control={Select} 
                                options={options} 
                                onChange={this.handleGender}
                        />

                        <Form.Field>
                            <label>出生日期</label>
                            <Input 
                                placeholder = 'Eg. 1997/07/16'
                                value= {this.state.dob}
                                onChange= {event => 
                                    this.setState({ dob: event.target.value })}  
                            />
                        </Form.Field>

                        <Form.Field>
                            <label>身高</label>
                            <Input 
                                placeholder = 'Eg. 183'
                                label={{ basic: true, content: 'cm' }}
                                labelPosition='right'
                                value= {this.state.height}
                                onChange= {event => 
                                    this.setState({ height: event.target.value })}  
                            />
                        </Form.Field>

                        <Form.Field>
                            <label>体重</label>
                            <Input 
                                placeholder = 'Eg. 65'
                                label={{ basic: true, content: 'kg' }}
                                labelPosition='right'
                                value= {this.state.weight}
                                onChange= {event => 
                                    this.setState({ weight: event.target.value })}  
                            />
                        </Form.Field>
                    </Form.Group>                   
                   
                    <br/>
                    <Form.Group widths='equal'>
                        <Form.TextArea
                                label='家庭住址'
                                placeholder = '海南省海口市美兰区人民路街道58号海南大学'
                                value= {this.state.houseaddr}
                                onChange= {event => 
                                    this.setState({ houseaddr: event.target.value })}  
                        />
                    </Form.Group>

                    <br/>
                    <h2 style={{ marginTop: '20px', marginBottom: '30px'}}>用药史</h2>
                    <Divider clearing />                    
                    <Form.Group widths='equal'>
                        <Form.Field>
                            <label>血型</label>
                            <Input 
                                placeholder = 'Eg. A-'
                                value= {this.state.bloodgroup}
                                onChange= {event => 
                                    this.setState({ bloodgroup: event.target.value })}  
                            />
                        </Form.Field>

                        <Form.Field 
                                label='过敏类型' 
                                control={Select} 
                                options={allergyOptions} 
                                onChange={this.handleAllergies}
                        />
                    </Form.Group>
                    <br/>
                    <Form.Group widths='equal'>
                        <Form.TextArea
                                label='当前使用药物'
                                placeholder = 'Eg. 阿司匹林'
                                value= {this.state.medication}
                                onChange= {event => 
                                    this.setState({ medication: event.target.value })}  
                        />
                    </Form.Group>

                    <br/>
                    <h2 style={{ marginTop: '20px', marginBottom: '30px'}}>紧急联系人</h2>
                    <Divider clearing />
                    <Form.Group widths='equal'>
                       <Form.Field>
                            <label>紧急联系人姓名</label>
                            <Input 
                                placeholder = 'Eg. 李四'
                                value= {this.state.emergencyName}
                                onChange= {event => 
                                    this.setState({ emergencyName: event.target.value })}  
                            />
                        </Form.Field>

                        <Form.Field>
                            <label>紧急联系号码</label>
                            <Input 
                                placeholder = 'Eg. 13888888888'
                                value= {this.state.emergencyContact}
                                onChange= {event => 
                                    this.setState({ emergencyContact: event.target.value })}  
                            />
                        </Form.Field>
                    </Form.Group>
                    <br/>
                    <Message error header="Oops!" content={this.state.errorMessage}/>
                    <Button primary loading={this.state.loading}>创建</Button>
                </Form>
                </Segment>
            </Layout>
        );
    }
}

export default RegisterPatient;