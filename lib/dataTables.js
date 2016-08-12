TabularTables = {};

TabularTables.Sites = new Tabular.Table({
  name: "Sites",
  collection: Sites,
  columns: [
    {data: "name", title: "Name"},
    {data: "description", title: "Description"},
    {
      tmpl: Meteor.isClient && Template.editSite
    }
  ]
});