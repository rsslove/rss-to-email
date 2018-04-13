const compile = require('string-template/compile');

const template = compile(`<mjml>
  <mj-head>
     <mj-attributes>
       <mj-all font-size="16px" color="dimgray" font-family="Helvetica" align="left" />
       <mj-body background-color="#ffffff"></mj-body>
       <mj-section padding="10px 10px 0"></mj-section>
       <mj-text padding="5px 15px" line-height="22px"></mj-text>
       <mj-divider padding="10px 15px" border-width="1px" border-style="dashed" border-color="lightgrey"></mj-divider>
     </mj-attributes>
     <mj-style inline="inline">
       a {
         color: {accentColor}; 
         text-decoration: underline;
       }
     </mj-style>
  </mj-head>
  <mj-body>
`);

module.exports = template;
