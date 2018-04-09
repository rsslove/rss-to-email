const compile = require('string-template/compile');

const template = compile(`<mjml>
  <mj-head>
     <mj-attributes>
       <mj-all font-size="16px" color="dimgray" font-family="Helvetica" align="left" />
       <mj-section padding="10 10 0"></mj-section>
       <mj-link color="{accentColor}" text-decoration="underline" text-transform="n/a" padding="5 15"></mj-link>
       <mj-text text-transform="n/a" padding="5 15"></mj-text>
       <mj-divider padding="10 15" border-width="1px" border-style="dashed" margin-bottom="0" border-color="lightgrey"></mj-divider>
     </mj-attributes>
     <mj-style inline="inline">
       a {
         color: {accentColor}; 
       }
     </mj-style>
  </mj-head>
  <mj-body>
    <mj-container background-color="#ffffff">
`);

module.exports = template;
