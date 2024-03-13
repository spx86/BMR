import React, { Component } from 'react';
import { Divider, Form, Input, Button, Segment, Message, Select} from 'semantic-ui-react';
import Layout from '../components/Layout';
import record from '../ethereum/record';
import web3 from '../ethereum/web3';

const genderOptions = [
    { key: 'm', text: '男性', value: 'Male' },
    { key: 'f', text: '女性', value: 'Female' },
    { key: 'o', text: '其他', value: 'Other' },
]

const qualificationOptions = [
    { key: 'h', text: '高级证书/SPM', value: 'Higher Certificate/SPM' },
    { key: 'd', text: '文凭', value: 'Diploma' },
    { key: 'b', text: '学士学位', value: 'Bachelor\'s Degree' },
    { key: 'm', text: '硕士学位', value: 'Master\'s Degree' },
    { key: 'dd', text: '博士学位', value: 'Doctoral Degree' },
]

class EditDoctor extends Component {
    state = {
        ic: '',
        name: '',
        phone: '',
        gender: '',
        dob: '',
        qualification: '',
        major: '',
        loading: false,
        errorMessage: ''
    };

    handleGender = (e, { value }) => this.setState({ gender: value })

    handleQualification = (e, { value }) => this.setState({ qualification: value })

    onSubmit = async event => {
        event.preventDefault();

        const { ic, name, phone, gender, dob, qualification, major } = this.state;

        this.setState({loading: true, errorMessage: ''});

        try {
            const accounts = await web3.eth.getAccounts();

            await record.methods.editDoctor(
                ic, name, phone, gender, dob, qualification, major
            ).send({ from: accounts[0] });

            alert("医师账户创建成功!");
        }
        catch (err) {
            this.setState({ errorMessage: err.message });
            alert("医师账户已经存在！");
        }

        this.setState({ loading: false, ic: '', name: '', phone: '', gender: '', dob: '', qualification: '', major: ''});
    }

    render() {
        return (
            <Layout>
                <Segment padded><h1>编辑资料</h1></Segment>
                <Segment>
                <h2 style={{ marginTop: '20px', marginBottom: '30px'}}>基本信息</h2>
                <Divider clearing />
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Group widths='equal'>
                        <Form.Field>
                            <label>ID</label>
                            <Input
                                placeholder = 'Eg. 410298********5674'                
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
                            options={genderOptions} 
                            onChange={this.handleGender}
                        />

                        <Form.Field>
                            <label>出生日期</label>
                            <Input 
                                placeholder = 'Eg. 01/01/1997'
                                value= {this.state.dob}
                                onChange= {event => 
                                    this.setState({ dob: event.target.value })}  
                            />
                        </Form.Field>
                    </Form.Group>                                    
                    <br/>
                    <h2 style={{ marginTop: '20px', marginBottom: '30px'}}>教育信息</h2>
                    <Divider clearing />
                    <Form.Group widths='equal'>
                        <Form.Field 
                            label='最高学历' 
                            control={Select} 
                            options={qualificationOptions} 
                            onChange={this.handleQualification}
                        />

                        <Form.Field>
                            <label>专业</label>
                            <Input 
                                placeholder = 'Eg. 神经外科'
                                value= {this.state.major}
                                onChange= {event => 
                                    this.setState({ major: event.target.value })}  
                            />
                        </Form.Field>
                    </Form.Group>
                    <Form.Group widths='equal'>
                
                        <Form.Field>
                            <label>学位证书编号</label>
                            <Input 
                                placeholder = 'Eg. e1db986c1cd534c1b9a6f44940c'
                                value= {this.state.dob}
                                onChange= {event => 
                                    this.setState({ dob: event.target.value })}  
                            />
                        </Form.Field>
                    </Form.Group>                   
                    <br/>
                    <h2 style={{ marginTop: '20px', marginBottom: '30px'}}>证书信息</h2>
                    <Divider clearing />
                    <Form.Group widths='equal'>
                        <Form.Field>
                            <label>执业类别</label>
                            <Input 
                                placeholder = 'Eg. 执业医师'
                                value= {this.state.dob}
                                onChange= {event => 
                                    this.setState({ dob: event.target.value })}  
                            />
                        </Form.Field>

                        <Form.Field>
                            <label>执业范围</label>
                            <Input 
                                placeholder = 'Eg. 神经外科'
                                value= {this.state.major}
                                onChange= {event => 
                                    this.setState({ major: event.target.value })}  
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>执业地点</label>
                            <Input 
                                placeholder = 'Eg. 北京市某医院'
                                value= {this.state.major}
                                onChange= {event => 
                                    this.setState({ major: event.target.value })}  
                            />
                        </Form.Field>
                    </Form.Group>
                    <br/>
                    <Form.Group widths='equal'>
                        <Form.Field>
                            <label>注册日期</label>
                            <Input
                                placeholder = 'Eg. 2020/01/01'                
                                value= {this.state.ic}
                                onChange= {event => 
                                    this.setState({ ic: event.target.value })}                           
                            />
                        </Form.Field>

                        <Form.Field>
                            <label>有效期限</label>
                            <Input
                                placeholder = 'Eg. 2025/01/01'                        
                                value= {this.state.name}
                                onChange= {event => 
                                    this.setState({ name: event.target.value })}                           
                            />
                        </Form.Field>
                    </Form.Group>
                    <Form.Group widths='equal'>
                
                        <Form.Field>
                            <label>证书编号</label>
                            <Input 
                                placeholder = 'Eg. 6e6abbbbf8a2393d1689a20a5e527fc01c'
                                value= {this.state.dob}
                                onChange= {event => 
                                    this.setState({ dob: event.target.value })}  
                            />
                        </Form.Field>
                    </Form.Group>                   
                    <br/>
                    <Form.Group widths='equal'>
                
                        <Form.Field>
                            <label>电子签名</label>
                            <Input 
                                placeholder = 'Eg. 0xe1db986c1cd534c1b9a6f44940c**********************************6e6abbbbf8a2393d1689a20a5e527fc01c'
                                value= {this.state.dob}
                                onChange= {event => 
                                    this.setState({ dob: event.target.value })}  
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

export default EditDoctor;