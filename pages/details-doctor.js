import React, { Component } from 'react';
import { Grid, Segment, Header, Image } from 'semantic-ui-react';
import Layout from '../components/Layout';
import record from '../ethereum/record';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

class DoctorDetails extends Component {

    static async getInitialProps(props) {
        const addr = props.query.address;
        const accounts = await web3.eth.getAccounts();
        var doctor, profilePic;

        try {
            doctor = await record.methods.searchDoctor(addr).call({from: accounts[0]});
            profilePic = (doctor[3] == 'Male') ? 'https://cdn-icons-png.flaticon.com/128/387/387561.png' : 'https://cdn-icons-png.flaticon.com/128/387/387569.png';
            
            return {
                ic: doctor[0],
                name: doctor[1],
                phone: doctor[2],
                gender: doctor[3],
                dob: doctor[4],
                qualification: doctor[5],
                major: doctor[6],
                profilePic,
            };
        }
        catch (err) {
            alert("你还没有创建一个账户");
            Router.pushRoute('/list');
        }
    }

    renderDisplayNew(){
        return (
            <Grid columns={2} stackable className="fill-content">
              <Grid.Row>
                <Grid.Column width={1} />
                <Grid.Column width={14}>
                <Segment>
                    <Image style={{marginBottom:'25px'}} className="centered" src={this.props.profilePic} size="small" circular />
                    <Segment>
                        <h2 style={{textAlign:'center'}}>{this.props.name}</h2>
                    </Segment>
                  </Segment>
                  <Segment>
                    <Header as="h3" color='grey' style={{marginBottom:'25px'}}>个人资料</Header>
                    <Grid columns={3} verticalAlign='top'>
                        <Grid.Row>
                            <Grid.Column>
                                <b style={{color:'grey'}}>姓名</b>
                                <div>{this.props.name}</div>
                            </Grid.Column>
                            <Grid.Column>
                                <b style={{color:'grey'}}>ID</b>
                                <div>{this.props.ic}</div>
                            </Grid.Column>
                            <Grid.Column>
                                <b style={{color:'grey'}}>性别</b>
                                <div>{this.props.gender}</div>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>

                    <Grid columns={2} verticalAlign='top'>
                        <Grid.Row>
                            <Grid.Column>
                                <b style={{color:'grey'}}>电话</b>
                                <div>{this.props.phone}</div>
                            </Grid.Column>
                            <Grid.Column>
                                <b style={{color:'grey'}}>出生日期</b>
                                <div>{this.props.dob}</div>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>

                    <Header as="h3" color='grey' style={{marginTop:'35px', marginBottom:'25px'}}>教育详情</Header>
                    <Grid columns={2} verticalAlign='top'>
                        <Grid.Row>
                            <Grid.Column>
                                <b style={{color:'grey'}}>最高学历</b>
                                <div>{this.props.qualification}</div>
                            </Grid.Column>
                            <Grid.Column>
                                <b style={{color:'grey'}}>专业</b>
                                <div>{this.props.major}</div>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    </Segment>
                </Grid.Column>
                <Grid.Column width={1} />
              </Grid.Row>
            </Grid>
          );
    }

    render() {
        return (
            <Layout>
                <div>
                    {this.renderDisplayNew()}
                </div>
            </Layout>
        );
    }
}

export default DoctorDetails;