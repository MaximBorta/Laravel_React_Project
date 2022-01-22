import React from 'react'

const CarouselHoc = (WrappedComponent) => {
     class Carousel extends WrappedComponent {
        constructor() {
            super();
            this.state = {
                index: 0
            }
            this.previous = this.previous.bind(this)
            this.next = this.next.bind(this)
        }
         previous(){
             const {index} = this.state
             if (index > 0) {
                 this.setState({index: index - 1})
             }
             clearTimeout(index)
         }
         next(){
             const {index} = this.state
             this.setState({
                 index: index + 1
             })
             clearTimeout(index)
         }

        render() {
            return (
                <WrappedComponent
                    {...this.props}
                    {...this.state}
                    previous={this.previous}
                    next={this.next}
                />
            )
        }
    }
    return Carousel
}

export default CarouselHoc