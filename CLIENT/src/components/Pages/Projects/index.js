import React, { Component } from 'react'
import { connect } from 'react-redux'

import Card from '../../common/Card'

export class index extends Component {
    render() {
        return (
            <div>
                <Card></Card>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(index)
