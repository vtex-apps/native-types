📢 Use this project, contribute to it or open issues to help evolve it using Store Discussion.

# Native Types

This app contains three public components that should be used to format texts according to intl rules.

## Configuration

Add the `native-types` app to the app's dependencies list (in the `manifest.json`) from which you want fetch product data. For example:

```json
"dependencies": {
  "vtex.native-types": "0.x"
}
```

### IOMessage

Coming soon :)

### IOMessageWithMarkers

This component is used to render messages with interpolations and custom tags (markers). These markers are useful to wrap a aprt of the message with CSS handles.

| Prop name | Type | Description | Default Value |
| --- | --- | --- | --- |
| `message` | `string` | The message that can contain values to be interpolated | `undefined` |
| `markers` | [`string`] | The list of markers to be used during interpolation | `[]` |
| `handleBase` | `string` | Handle that will be used along with the marker to create a span with `CSS handle` on the part wrapped by marks | `''` |
| `values` | `Record<string, any>` | Values used in the message interpolation | `{}` |

**Example:**
 - message: '<bold>Hello,</bold> {name}!'
 - markers: ['bold']
 - handleBase: 'Greetings'
 - values: { name: 'John Doe' }
 
 The following will be rendered:
```
  <div>
    <span
      class="Greetings_bold"
    >
      Hello,
    </span>
     John Doe!
  </div>
```


**🔴 WARNING:** The `markers` and `values` props of this component are both passed to `IOMessage` through `values` so it is important to notive that you **should not** use the same labels within these props.

### formatIOMessage

Coming soon :)
