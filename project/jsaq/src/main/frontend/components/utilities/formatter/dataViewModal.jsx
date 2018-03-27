import React, { Component } from 'react';
import { Container, Modal,ModalHeader, ModalBody, Row, Col, Table, Column, Pagination, Divider } from 'epm-ui';
import { fmoney } from './numFormate';

class DataViewModal extends Component {

    constructor( props ) {
        super( props );

        this.state = {
            visible: false,
            showCol3: false,
            showCol5: false,
            tableTitle:['--','--(-)'],
            tableMap:[{names:'--',value:'--'}],
            tempMap:[{names:'--',value:'--'}],
            tableLength:0,
            tableIndex:1,
            tableSize:10,
            tablePages:0,
        }
        this.getOptionTable = this.getOptionTable.bind( this );
        this.handleChangePagination = this.handleChangePagination.bind( this );

    }

    // 多次渲染
    componentWillReceiveProps( nextProps ) {
        /*this.setState({visible: false},
         () => {
         this.getOptionTable( nextProps.modalData );
         }
         );*/

        this.getOptionTable( nextProps.modalData );

    }

    handleClose() {
        this.setState( { visible: false },()=>{
            this.props.handleClose( this.state.visible );
        } );
    }

    //处理图表数据，改变成表格
    getOptionTable( pieTableList ) {
        /*alert(pieTableList[3].length);*/
        let tableList=[];
        let laTitle=pieTableList[0].split(',');
        let index = laTitle[1].indexOf('(');
        let unit2 = laTitle[1].substring(index+1,index+2);
        let unit3 ='';
        let unit4 ='';
        let unit5 ='';

        let laCol1 = pieTableList[1];
        let laCol2 = pieTableList[2];
        let laCol3 = [];
        let laCol4 = [];
        let laCol5 = [];
        if( pieTableList[3].length>0 ){
            laCol3 = pieTableList[3];
        }
        if( pieTableList[4].length>0 ){
            laCol4 = pieTableList[4];
            laCol5 = pieTableList[5];
        }
        if(laCol3.length>0) {
            index = laTitle[2].indexOf('(');
            unit3 = laTitle[2].substring(index + 1, index + 2);
        }
        if(laCol4.length>0) {
            index = laTitle[2].indexOf('(');
            unit3 = laTitle[2].substring(index + 1, index + 2);
            index = laTitle[3].indexOf('(');
            unit4 = laTitle[3].substring(index + 1, index + 2);
            index = laTitle[4].indexOf('(');
            unit5 = laTitle[4].substring(index + 1, index + 2);
        }
        let pages=Math.ceil(laCol1.length/this.state.tableSize);


            for(let i=0;i<laCol1.length;i++){
                let tableMap = {};
                if(laCol4.length>0){
                    tableMap.names = laCol1[i];
                    tableMap.value = fmoney(laCol2[i],2,unit2);
                    tableMap.value3 = fmoney(laCol3[i],2,unit3);
                    tableMap.value4 = fmoney(laCol4[i],2,unit4);
                    tableMap.value5 = fmoney(laCol5[i],2,unit5);
                }else if(laCol3.length>0){
                    tableMap.names = laCol1[i];
                    tableMap.value = fmoney(laCol2[i],2,unit2);
                    tableMap.value3 = fmoney(laCol3[i],2,unit3);
                }else{
                    tableMap.names = laCol1[i];
                    tableMap.value = fmoney(laCol2[i],2,unit2);
                }
                tableList.push(tableMap);

            }



        this.state.tableTitle = laTitle;
        this.state.tempMap = tableList;
        this.state.visible =  pieTableList[6];
        this.state.tableLength = laCol1.length;
        this.state.tablePages = pages;

        if( pieTableList[4].length>0 ){
            this.state.showCol5 = true;
        }else if( pieTableList[3].length>0 ){
            this.state.showCol3 = true;
        }


        //this.setState({tableTitle : laTitle,tempMap:tableList,visible: pieTableList[4],tableLength:laCol1.length,tablePages:pages});
        this.handleChangePagination(1,this.state.tableSize);
    }

    //处理分页数据，每页数据成表格
    handleChangePagination(index,size){
        let colindex = 0 ;

        if( index == 1){
            colindex = 0
        }else{
            colindex=(index-1)*size;
        }

        let tableList = [];
        this.setState({tableMap:[]});
        let pageIndex = 0;
        if(index == this.state.tablePages){
            pageIndex = this.state.tableLength;
        }else{
            pageIndex = index*size;
        }
        for(let i=colindex;i<pageIndex;i++){
            let tableMapTemp={};
            tableMapTemp = this.state.tempMap[i];
            tableList.push(tableMapTemp);
        }

        this.setState({tableMap:tableList,tableIndex:index});

    }


    render() {
        return (
            <Container>
                <Modal visible={ this.state.visible } onClose={ this.handleClose.bind( this ) } >
                    <ModalBody>
                        <Row>
                            <Col size={12}>
                                数据视图
                               {
                                    this.state.showCol5 ?
                                        <Table dataSource={this.state.tableMap}>
                                            <Column title={this.state.tableTitle[0]} dataIndex="names" />
                                            <Column title={this.state.tableTitle[1]} dataIndex="value" />
                                            <Column title={this.state.tableTitle[2]} dataIndex="value3"/>
                                            <Column title={this.state.tableTitle[3]} dataIndex="value4"/>
                                            <Column title={this.state.tableTitle[4]} dataIndex="value5"/>
                                        </Table>
                                        : this.state.showCol3?
                                        <Table dataSource={this.state.tableMap}>
                                            <Column title={this.state.tableTitle[0]} dataIndex="names" />
                                            <Column title={this.state.tableTitle[1]} dataIndex="value" />
                                            <Column title={this.state.tableTitle[2]} dataIndex="value3"/>
                                        </Table>
                                        :
                                        <Table dataSource={this.state.tableMap}>
                                            <Column title={this.state.tableTitle[0]} dataIndex="names" />
                                            <Column title={this.state.tableTitle[1]} dataIndex="value" />
                                        </Table>
                                }

                         <Divider />
                            </Col>
                        </Row>
                        <Row>
                            <Col size={12}>
                                <div style={{float:'right'}}>
                                    <Pagination index={ this.state.tableIndex } size={this.state.tableSize} total={ this.state.tableLength } pages={ this.state.tablePages } onChange={this.handleChangePagination}/>
                                </div>
                            </Col>
                        </Row>
                    </ModalBody>
                </Modal>
            </Container>
        );
    }

}


export { DataViewModal };
export default DataViewModal;