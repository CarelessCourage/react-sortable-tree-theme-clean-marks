import React, { Component } from 'react';
import SortableTree from 'react-sortable-tree';
import FileExplorerTheme from '../index';

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
          title: 'src',
          expanded: true,
          checked: false,
          children: [
            { title: 'styles.css', checked: false },
            { title: 'index.js', checked: false },
            { title: 'reducers.js', checked: false },
            { title: 'actions.js', checked: false },
            { title: 'utils.js', checked: false },
          ],
        },
        {
          title: 'tmp',
          checked: false,
          children: [
            { title: '12214124-log', checked: false },
            { title: 'drag-disabled-file', checked: false},
          ],
        },
        {
          title: 'src',
          checked: false,
          children: [
            { title: 'styles.css', checked: false },
            { title: 'index.js', checked: false },
            { title: 'reducers.js', checked: false },
            { title: 'actions.js', checked: false },
            { title: 'utils.js', checked: false },
          ],
        },
        {
          title: 'tmp',
          checked: false,
          children: [
            { title: '12214124-log', checked: false },
            { title: 'drag-disabled-file', checked: false },
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
      icons: rowInfo.node.isDirectory
        ? [
          <div
            style={{
              borderLeft: 'solid 8px gray',
              borderBottom: 'solid 10px gray',
              marginRight: 10,
              boxSizing: 'border-box',
              width: 16,
              height: 12,
              filter: rowInfo.node.expanded
                ? 'drop-shadow(1px 0 0 gray) drop-shadow(0 1px 0 gray) drop-shadow(0 -1px 0 gray) drop-shadow(-1px 0 0 gray)'
                : 'none',
              borderColor: rowInfo.node.expanded ? 'white' : 'gray',
            }}
          />,
        ]
        : [
          <div
            style={{
              border: 'solid 1px black',
              fontSize: 8,
              textAlign: 'center',
              marginRight: 10,
              width: 12,
              height: 16,
            }}
          >
            F
        </div>,
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

        <SortableTree
          isVirtualized={false}
          theme={FileExplorerTheme}
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
          canDrop={({ nextParent }) => !nextParent || nextParent.isDirectory}
          //generateNodeProps={rowInfo => this.nodeProps(rowInfo)}
        />
      </div>
    );
  }
}

export default App;
