import React, { Component } from 'react';
import SortableTree from 'react-sortable-tree';
import customTheme from '../index';
import ModularIcon from '../ModularIcon';
import styles from '../node-content-renderer.scss';

//import { Multiselect } from 'react-widgets'

//import ms from '../multiselect.scss'
//import '../react-widgets.css';

import './app.scss';
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchString: '',
      searchFocusIndex: 0,
      searchFoundCount: null,
      treeData: [
        {
          title: 'General information',
          expanded: true,
          checked: false,
          children: [
            { title: 'Industry Plant', checked: false },
            { title: 'Finance', checked: false },
            { title: 'Law', checked: false },
            { title: 'Janitor', checked: false },
            { title: 'Window Cleaner', checked: false },
          ],
        },
        {
          title: 'UX/UI',
          checked: false,
          children: [
            { title: '12214124-log', checked: false },
            { title: 'drag-disabled-file', checked: false},
          ],
        },
        {
          title: 'Communication',
          checked: false,
          children: [
            { title: 'styles.css', checked: false },
            { title: 'index.js', checked: false },
            { title: 'reducers.js', checked: false },
            { title: 'actions.js', checked: false },
            { title: 'utils.js', checked: false },
          ],
        },
      ],
    };

    this.updateTreeData = this.updateTreeData.bind(this);
    this.nodeProps = this.nodeProps.bind(this);
  }

  updateTreeData(treeData) {
    this.setState({ treeData });
  }

  nodeProps(rowInfo) {
    return {
      icons: [
        <ModularIcon
          aria-label={rowInfo.node.expanded ? 'Collapse' : 'Expand'}
          expandedClass={
            (!rowInfo.node.children ?
            styles.checkmark + " " + (rowInfo.node.checked ? " " : styles.empty) :
            " ") + " " +
            (!rowInfo.node.expanded && rowInfo.node.children ? styles.rotate90 : " ")
          }
          onClick={() => rowInfo.node.checked = !rowInfo.node.checked}
        />,
        ],
      buttons: [],
    }
  }

  render() {
    const {
      treeData,
      searchString,
      searchFocusIndex,
    } = this.state;

    return (
      <div>
        <h1>Topics</h1>
        <SortableTree
          isVirtualized={false}
          theme={customTheme}
          treeData={treeData}
          onChange={this.updateTreeData}
          searchQuery={searchString}
          searchFocusOffset={searchFocusIndex}
          searchFinishCallback={matches =>
            this.setState({
              searchFoundCount: matches.length,
              searchFocusIndex:
                matches.length > 0 ? searchFocusIndex % matches.length : 0,
            })
          }
          canDrag={({ node }) => !node.dragDisabled}
          generateNodeProps={rowInfo => this.nodeProps(rowInfo)}
        />
      </div>
    );
  }
}

export default App;
