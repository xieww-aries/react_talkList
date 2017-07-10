var React = require('react');   //react核心
var ReactDom = require('react-dom');    //描画dom

//创建组件
//ToDoList组件
var ToDoList = React.createClass({
    getInitialState : function(){
        return {
            //模拟的后台数据库
            arr : [
                {name:'alex',content:'fuck'}
            ]
        }
    },
    //实时同步arr数据,接收Do组件的数据
    updateArr : function(data) {
        this.setState({
            arr : data
        })
    },
    //给Do和List组件传递状态(数据和方法)
    render : function(){
        return (
            <div title="ToDoList">
                <Do arr={this.state.arr} upDateArr={this.updateArr}></Do>
                <List arr={this.state.arr}></List>
            </div>
        )
    }
});
//Do组件
var Do = React.createClass({
    //Do组件中存放两个文本框的状态
    getInitialState : function(){
        return {
            ipt1 : '',
            ipt2 : ''
        }
    },
    //add方法，根据文本框中的输入内容实时更新数据库arr
    add : function(){
        var arr = this.props.arr;
        arr.unshift({
            name:this.state.ipt1,
            content:this.state.ipt2
        });
        this.setState({
            ipt1 : '',
            ipt2 : ''
        });
        this.props.upDateArr(arr);
    },
    //第一个文本框的值的实时变化
    nameChange : function(e){
        this.setState({
            ipt1 : e.target.value
        })
    },
    //第二个文本框的值的实时变化
    contentChange : function(e){
        this.setState({
            ipt2 : e.target.value
        })
    },
    render : function(){
        return (
            <div title="Do">
                <input type="text" value={this.state.ipt1} onChange={this.nameChange}/>
                <br/>
                <input type="text" value={this.state.ipt2} onChange={this.contentChange}/>
                <To add={this.add}></To>
            </div>
        )
    }
});

var To = React.createClass({
    render : function(){
        return (
            <input type="button" value="提交" onClick={this.props.add}/>
        )
    }
});

var List = React.createClass({
    //循环arr通过虚拟dom渲染到页面上去
    render : function(){
        return (
            <ul>
                {
                    this.props.arr.map(function(item,index){
                        return <li key={index}>{item.content}----{item.name}</li>
                    })
                }
            </ul>
        )
    }
});

ReactDom.render(
    <ToDoList/>,
    document.querySelector('#app')
);
