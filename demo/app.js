import React, { Component, useState } from 'react';
import SortableTree from 'react-sortable-tree';
import FileExplorerTheme from '../index';
import style from './app.scss';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchString: '',
      searchFocusIndex: 0,
      searchFoundCount: null,
      treeData: [
        { title: '.gitignore' },
        { title: 'package.json' },
        {
          title: 'src',
          isDirectory: true,
          expanded: true,
          children: [
            { title: 'styles.css' },
            { title: 'index.js' },
            { title: 'reducers.js' },
            { title: 'actions.js' },
            { title: 'utils.js' },
          ],
        },
        {
          title: 'tmp',
          isDirectory: true,
          children: [
            { title: '12214124-log' },
            { title: 'drag-disabled-file', dragDisabled: true },
          ],
        },
        {
          title: 'build',
          isDirectory: true,
          children: [{ title: 'react-sortable-tree.js' }],
        },
        {
          title: 'public',
          isDirectory: true,
        },
        {
          title: 'node_modules',
          isDirectory: true,
        },
      ],
    };

    this.test = this.test.bind(this);
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

  test() {
    console.log("test works: ", style);
  }

  render() {
    const {
      treeData,
      searchString,
      searchFocusIndex,
    } = this.state;

    return (
      <div style={{ height: '100vh' }}>

        <div onClick={this.test}>
          <svg id="Layer_1" className={style.checkmark + " " + style.empty} data-name="Layer 1" viewBox="0 0 24 24">
            <circle id="circleBg" className={style.circleBg} cx="12" cy="12" r="12" />
            <g id="lines" className={style.lines}>
              <line id="line" className={style.line} x1="11.99" y1="16.74" x2="20.47" y2="8.26" />
              <line id="line2" className={style.line2} x1="11.99" y1="16.74" x2="3.5" y2="8.26" />
            </g>
          </svg>
        </div>

        <SortableTree
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
