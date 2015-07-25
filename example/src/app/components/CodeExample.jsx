import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/theme/solarized.css';
import 'codemirror/lib/codemirror.css';

import React from 'react';
import CodeMirror from 'codemirror';
import 'codemirror/addon/runmode/runmode';

export default class CodeExample extends React.Component {

  render() {
    return (
      <pre className="cm-s-solarized cm-s-light" style={{textAlign: 'left'}}>
        <code>
        </code>
      </pre>
    );
  }

  componentDidMount() {
    if (CodeMirror === undefined) {
      return;
    }

    CodeMirror(React.findDOMNode(this).children[0], {
      value: this.props.codeText,
      mode: this.props.mode,
      lineWrapping: true,
      readOnly: true
    });
  }
}

CodeExample.propTypes = {
  codeText: React.PropTypes.string,
  mode: React.PropTypes.string
};

CodeExample.defaultProps = {
  mode: 'javascript'
};

