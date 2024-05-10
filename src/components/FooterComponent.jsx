import React, { Component } from 'react'

class FooterComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <div>
                <footer className = "footer">
                    <span className='text-muted'>This project was developed during the etiya internship</span>
                    <br />
                    <span className="text-muted">All Rights Reserved 2024 @Ekin Utku</span>
                </footer>
            </div>
        )
    }
}

export default FooterComponent
