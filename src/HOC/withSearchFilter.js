import React from 'react'

const withSearchFilter = (WrappedComponent) => {
    class SearchFilter extends WrappedComponent {
        constructor(props) {
            super(props);
            this.state = {
                searchTerm: '',
                filteredResult: []
            }
            this.onSearchChange = this.onSearchChange.bind(this)
        }

        onSearchChange(e, generateList) {
            const {searchTerm} = this.state
            let lowercaseFilter = searchTerm.toLowerCase()
            let keyWord = e.target.value
            if (keyWord !== '') {
                let results = generateList.filter(item => {
                    return Object.keys(item).some(key =>
                        typeof item[key] === 'string' && item[key].toLowerCase().includes(lowercaseFilter)
                    )
                })
                this.setState({
                    filteredResult: results
                })
                // console.log(results)
            } else {
                this.setState({
                    filteredResult: this.props.postResponse
                })
            }
            this.setState({
                searchTerm: keyWord
            })
            // console.log(searchTerm)
        }

        render() {
            return (
                <WrappedComponent
                    {...this.props}
                    {...this.state}
                    onSearchChange={this.onSearchChange}
                />
            )
        }
    }

    return SearchFilter
}


export default withSearchFilter