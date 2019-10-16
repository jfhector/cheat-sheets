# Accessibility in React

## Focus management

### Set focus after navigation, using `componentDidMount`

```jsx
class PageFocusSection extends Component {
  componentDidMount() {
    this.header.focus();
  }
  render() {
    const { children, headingText } = this.props;
    return (<section>
        <h2 tabIndex="-1"
            ref={header => {this.header = header;}}>
          {headingText}
        </h2>
        {children}
      </section>);
  }
}
```