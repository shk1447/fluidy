<template>
  <div style="width: 100%; height: 100%">
    <div
      style="width: 100%; height: 100%; z-index: 1"
      ref="flow_container"
      @dragover="dragover"
      @drop="drop"
    ></div>

    <div class="side-btn">
      <label style="font-size: 0.8em; color: #684">Snap</label>
      <div>
        <input
          v-model="grid_snap"
          type="checkbox"
          id="switch1"
          name="switch1"
          class="input__on-off"
        />
        <label for="switch1" class="label__on-off">
          <span class="marble"></span>
        </label>
      </div>
      <div style="display: flex">
        <v-tooltip left v-if="!expand">
          <template v-slot:activator="{ on }">
            <div
              v-on="on"
              draggable
              @dragstart="dragstart($event, selected_type)"
              @dblclick="expandItem"
              :style="
                'margin:.1em;width:50px;height: 50px;background: url(./static/images/' +
                selected_type.toLowerCase() +
                '.svg) 50% 50% / contain no-repeat;/* margin-top: 1em; *//* padding-top: 1em; */'
              "
            ></div>
          </template>
          <span>Drag and Drop : {{ selected_type }}</span>
        </v-tooltip>
        <div
          v-else
          draggable
          @dragstart="dragstart($event, item)"
          @click="onSelectType(item)"
          :key="i"
          v-for="(item, i) in node_types"
          :style="
            'margin:.2em;width:50px;height: 50px;background: url(./static/images/' +
            item.toLowerCase() +
            '.svg) 50% 50% / contain no-repeat;'
          "
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import cytoscape from "cytoscape";
import EdgeEditation from "./CytoscapeEdgeEditation.js";
import GridGuide from "cytoscape-grid-guide";
import contextMenus from "cytoscape-context-menus";
import "cytoscape-context-menus/cytoscape-context-menus.css";
import popper from "cytoscape-popper";
import mainEventBus from "../../eventbus/mainEventBus";
cytoscape.use(contextMenus);
cytoscape.use(popper);
GridGuide(cytoscape);

export default {
  props: ["flowData"],
  components: {},
  watch: {
    flowData(val, oldval) {
      console.log("props changed");
      console.log(val);

      this.cy.nodes(".flow").remove();
      this.cy.edges().remove();
      val
        .filter((d) => d.type !== "Edge")
        .forEach((d, i) => {
          if (this.cy.elements("#" + d.id).length > 0) {
            this.cy.elements("#" + d.id).data("name", d.name);
            this.cy.elements("#" + d.id).data("type", d.type);
            this.cy.elements("#" + d.id).data("desc", d.desc);
          } else {
            const node = this.cy.add({
              data: {
                idx: d.idx,
                id: d.idx,
                name: d.name,
                type: d.type,
                desc: d.desc,
                emitData: d,
              },
              position: d.meta.position,
              classes: d.classes ? d.classes : ["flow"],
            });
            const update = () => {
              const nodeData = node.json();
              const data = {
                idx: nodeData.data.idx,
                type: nodeData.data.type,
                desc: nodeData.data.desc,
                meta: JSON.stringify({
                  position: nodeData.position,
                }),
              };
              this.$emit("update", data);
            };
            node.on("position", update);
          }
        });
      const poppers = [];
      this.cy.nodes().forEach((node) => {
        if (node.json().data.hasOwnProperty("idx")) {
          console.log();

          // const proper = node.popper({
          //   content: () => {
          //     let div = document.createElement("div");
          //     div.innerHTML = "Example Text";
          //     div.style.color = "white";
          //     div.id = "popper" + node.json().data.id;
          //     this.$refs.flow_container.appendChild(div);
          //     const rect = node.popperRef().getBoundingClientRect();
          //     console.log(rect);
          //     let sub = document.createElement("div");
          //     /**
          //    * position: relative;
          //       top: -90px;
          //       left: 60px;
          //       color: cyan;
          //    *
          //    */
          //     sub.style.position = "relative";
          //     sub.style.width = "30px";
          //     sub.style.heigth = "30px";
          //     sub.style.textAlign = "center";
          //     sub.style.top = "-90px";
          //     sub.style.left = "60px";
          //     sub.innerHTML = "N";
          //     sub.style.color = "white";
          //     sub.style.backgroundColor = "purple";
          //     sub.style.borderRadius = "50%";
          //     div.appendChild(sub);
          //     return div;
          //   },
          //   popper: {}, // my popper options here
          // });
          // const updateA = () => {
          //   proper.update();
          //   node.json().data.emitData.meta = JSON.stringify({
          //     position: node.json().position,
          //   });
          //   this.$emit("update", node.json().data.emitData);
          // };
          // node.on("position", updateA);
          // node.on("pan", updateA);
          // node.on("remove ", (target) => {
          //   console.log("=======Fffffff");
          //   console.log(target);
          //   $("#" + "popper" + node.json().data.id).remove();
          //   console.log("=======Fffffff");
          // });
          // poppers.push(proper);
        }
      });
      this.cy.on("pan zoom resize", () => {
        poppers.forEach((popper) => {
          popper.update();
        });
      });
      val
        .filter((d) => d.type === "Edge")
        .forEach((edge) => {
          if (
            this.cy.nodes("#" + edge.meta.edge.source).length > 0 &&
            this.cy.nodes("#" + edge.meta.edge.target).length > 0
          ) {
            this.cy.add({
              data: edge.meta.edge,
              name: edge.name,
              type: edge.type,
              id: edge.idx,
              idx: edge.idx,
              classes: "taxi",
            });
          }
        });
    },
  },
  data() {
    return {
      grid_snap: true,
      expand: false,
      selected_type: "Process",
      node_types: [
        "Process",
        "Decision",
        "Document",
        "Terminal",
        "OtherProcess",
        "Database",
        "MultiDocuments",
      ],
      old_id: null,
      tab: 0,
      tabs: [
        {
          name: "Flow",
        },
      ],
    };
  },
  methods: {
    expandItem() {
      this.expand = true;
    },
    onSelectType(type) {
      this.selected_type = type;
      this.expand = false;
    },
    dragstart: function (e, type) {
      e.dataTransfer.setData("type", type);
    },
    dragover: function (e) {
      e.preventDefault();
    },
    drop: function (e) {
      e.preventDefault();
      const type = e.dataTransfer.getData("type");
      e.preventDefault();
      let zoom = this.cy.zoom();
      let pan = this.cy.pan();
      var position = {
        x: (e.offsetX - pan.x) / zoom,
        y: (e.offsetY - pan.y) / zoom,
      };
      this.emitAddNode({
        type: type,
        name: type,
        meta: JSON.stringify({ position: position }),
      });
    },
    emitAddNode(data) {
      this.$emit("addNode", data);
    },
  },
  update() {
    /**
     * <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<TODO>>>>>>>>>>>>>>>>>>>>>>>
     * props change -> redraw
     *
     */
  },

  mounted() {
    this.cy = cytoscape({
      wheelSensitivity: 0.1,
      zoom: 0.522719885372964,
      container: this.$refs.flow_container,
      layout: {
        name: "preset",
      },
      boxSelectionEnabled: true,
      elements: {
        nodes: [],
        edges: [],
      },
      style: [
        {
          selector: "node",
          style: {
            content: "data(name)",
            shape: function (node) {
              var shape = "rectangle";
              return shape;
            },
            color: "rgb(185, 185, 185)",
            "background-opacity": function (node) {
              var opacity = 0;
              return opacity;
            },
            "background-image": function (node) {
              var image_path = null;
              if (node.data("type")) {
                image_path =
                  "./static/images/" + node.data("type").toLowerCase() + ".svg";
              }
              return image_path;
            },
            "text-max-width": "150px",
            "text-wrap": "ellipsis",
            "text-overflow-wrap": "anywhere",
            "text-valign": function (node) {
              var ret = "top";
              ret = "center";

              return ret;
            },
            "text-halign": function (node) {
              var ret = "right";
              ret = "center;";

              return ret;
            },
            "background-color": "#f6f6f6",
            "border-width": 0,
            "border-color": "#555",
            "font-size": 20,
            width: function (node) {
              var size = 175;
              return size;
            },
            height: function (node) {
              var size = 125;
              return size;
            },
          },
        },
        {
          selector: "node:selected",
          style: {
            "border-color": "#d67614",
            "border-width": 1.5,
          },
        },
        {
          selector: "edge",
          style: {
            "line-color": "#555555",
            "target-arrow-color": "#555",
            "source-arrow-color": "#555",
            "text-border-color": "#555",
            color: "#555555",
            width: 3,
          },
        },
        {
          selector: "edge:selected",
          style: {
            color: "#d67614",
            "line-color": "#d67614",
            "text-border-color": "#d67614",
            "source-arrow-color": "#d67614",
            "target-arrow-color": "#d67614",
          },
        },
        {
          selector: "edge.taxi",
          style: {
            label: "data(name)",
            "text-margin-x": "0px",
            "text-margin-y": "12px",
            "curve-style": "taxi",
            "taxi-direction": "downward",
            "taxi-turn": function (a) {
              var source = this.cy.nodes("#" + a.data().source).position();
              var target = this.cy.nodes("#" + a.data().target).position();
              var dis_y = source.y - target.y;
              var distance = Math.sqrt(Math.abs(dis_y * dis_y));
              return distance / 3;
            }.bind(this),
            width: 3,
            "taxi-turn-min-distance": 5,
            "target-arrow-shape": "triangle",
          },
        },
      ],
    }).on("cxttap", function (event) {
      if (allSelected("node")) {
        contextMenu.hideMenuItem("select-all-nodes");
        contextMenu.showMenuItem("unselect-all-nodes");
      } else {
        contextMenu.hideMenuItem("unselect-all-nodes");
        contextMenu.showMenuItem("select-all-nodes");
      }
      if (allSelected("edge")) {
        contextMenu.hideMenuItem("select-all-edges");
        contextMenu.showMenuItem("unselect-all-edges");
      } else {
        contextMenu.hideMenuItem("unselect-all-edges");
        contextMenu.showMenuItem("select-all-edges");
      }
    });

    const allSelected = (type) => {
      if (type == "node") {
        return this.cy.nodes().length == this.cy.nodes(":selected").length;
      } else if (type == "edge") {
        return this.cy.edges().length == this.cy.edges(":selected").length;
      }
      return false;
    };

    const selectAllOfTheSameType = (type) => {
      if (type == "node") {
        this.cy.nodes().select();
      } else if (type == "edge") {
        this.cy.edges().select();
      }
    };
    const unselectAllOfTheSameType = (type) => {
      if (type == "node") {
        this.cy.nodes().unselect();
      } else if (type == "edge") {
        this.cy.edges().unselect();
      }
    };
    this.handles = new EdgeEditation();
    this.handles.init(this.cy, (edge) => {
      this.$emit("addEdge", {
        type: "Edge",
        name: "Edge",
        meta: JSON.stringify({
          edge: {
            source: edge.json().data.source,
            target: edge.json().data.target,
          },
        }),
      });
    });
    this.handles.registerHandle({
      positionX: "center", //horizontal position of the handle  (left | center | right)
      positionY: "center", //vertical position of the handle  (top | center | bottom)
      color: "#518EF8", //color of the handle
      type: "default", //stored as data() attribute, can be used for styling
      single: false, //wheter only one edge of this type can start from same node (default false)
      nodeTypeNames: [
        "Process",
        "Decision",
        "Document",
        "Process",
        "Terminal",
        "OtherProcess",
        "Database",
        "MultiDocuments",
      ], //which types of nodes will contain this handle
      noMultigraph: false, //whereter two nodes can't be connected with multiple edges (does not consider orientation)
    });
    this.cy.gridGuide({
      // On/Off Modules
      /* From the following four snap options, at most one should be true at a given time */
      snapToGridOnRelease: this.grid_snap, // Snap to grid on release
      snapToGridDuringDrag: this.grid_snap, // Snap to grid during drag
      snapToAlignmentLocationOnRelease: false, // Snap to alignment location on release
      snapToAlignmentLocationDuringDrag: false, // Snap to alignment location during drag
      distributionGuidelines: false, // Distribution guidelines
      geometricGuideline: false, // Geometric guidelines
      initPosAlignment: false, // Guideline to initial mouse position
      centerToEdgeAlignment: false, // Center to edge alignment
      resize: false, // Adjust node sizes to cell sizes
      parentPadding: false, // Adjust parent sizes to cell sizes by padding
      drawGrid: true, // Draw grid background

      // General
      gridSpacing: 100, // Distance between the lines of the grid.
      snapToGridCenter: true, // Snaps nodes to center of gridlines. When false, snaps to gridlines themselves. Note that either snapToGridOnRelease or snapToGridDuringDrag must be true.

      // Draw Grid
      zoomDash: true, // Determines whether the size of the dashes should change when the drawing is zoomed in and out if grid is drawn.
      panGrid: true, // Determines whether the grid should move then the user moves the graph if grid is drawn.
      gridStackOrder: -1, // Namely z-index
      gridColor: "#333333", // Color of grid lines
      lineWidth: 1.0, // Width of grid lines

      // Guidelines
      guidelinesStackOrder: 4, // z-index of guidelines
      guidelinesTolerance: 2.0, // Tolerance distance for rendered positions of nodes' interaction.
      guidelinesStyle: {
        // Set ctx properties of line. Properties are here:
        strokeStyle: "#8b7d6b", // color of geometric guidelines
        geometricGuidelineRange: 400, // range of geometric guidelines
        range: 100, // max range of distribution guidelines
        minDistRange: 10, // min range for distribution guidelines
        distGuidelineOffset: 10, // shift amount of distribution guidelines
        horizontalDistColor: "#ff0000", // color of horizontal distribution alignment
        verticalDistColor: "#00ff00", // color of vertical distribution alignment
        initPosAlignmentColor: "#0000ff", // color of alignment to initial mouse location
        lineDash: [0, 0], // line style of geometric guidelines
        horizontalDistLine: [0, 0], // line style of horizontal distribution guidelines
        verticalDistLine: [0, 0], // line style of vertical distribution guidelines
        initPosAlignmentLine: [0, 0], // line style of alignment to initial mouse position
      },

      // Parent Padding
      parentSpacing: -1, // -1 to set paddings of parents to gridSpacing
    });

    // demo your core ext
    var contextMenu = this.cy.contextMenus({
      menuItems: [
        {
          id: "remove",
          content: "remove",
          tooltipText: "remove",
          image: { width: 12, height: 12, x: 6, y: 4 },
          selector: "node, edge",
          onClickFunction: (event) => {
            // var target = event.target || event.cyTarget;
            // removed = target.remove();

            // contextMenu.showMenuItem('undo-last-remove');
            console.log(event.target.json());
            this.$emit("remove", event.target.json().data.idx);
          },
          hasTrailingDivider: true,
        },
        {
          id: "undo-last-remove",
          content: "undo last remove",
          selector: "node, edge",
          show: false,
          coreAsWell: true,
          onClickFunction: function (event) {
            // if (removed) {
            //   removed.restore();
            // }
            // contextMenu.hideMenuItem('undo-last-remove');
            this.$emit("undoLastRemoved", event);
          },
          hasTrailingDivider: true,
        },
        {
          id: "add-node",
          content: "add node",
          tooltipText: "add node",
          image: { width: 12, height: 12, x: 6, y: 4 },
          coreAsWell: true,
          hasTrailingDivider: true,
          submenu: [
            {
              id: "add-process",
              content: "process",
              tooltipText: "process",
              onClickFunction: (event) => {
                const pos = event.position || event.cyPosition;
                this.emitAddNode({
                  type: "Process",
                  name: "Process",
                  meta: JSON.stringify({ position: pos }),
                });
              },
            },
            {
              id: "add-decision",
              content: "decision",
              tooltipText: "decision",
              onClickFunction: (event) => {
                const pos = event.position || event.cyPosition;
                this.emitAddNode({
                  type: "Decision",
                  name: "Decision",
                  meta: JSON.stringify({ position: pos }),
                });
              },
            },
            {
              id: "add-document",
              content: "document",
              tooltipText: "document",
              onClickFunction: (event) => {
                const pos = event.position || event.cyPosition;
                this.emitAddNode({
                  type: "Document",
                  name: "Document",
                  meta: JSON.stringify({ position: pos }),
                });
              },
            },
            {
              id: "add-termianl",
              content: "termial",
              tooltipText: "termial",
              onClickFunction: (event) => {
                const pos = event.position || event.cyPosition;
                this.emitAddNode({
                  type: "Terminal",
                  name: "Terminal",
                  meta: JSON.stringify({ position: pos }),
                });
              },
            },
            {
              id: "add-otherprocess",
              content: "other process",
              tooltipText: "other process",
              onClickFunction: (event) => {
                const pos = event.position || event.cyPosition;
                this.emitAddNode({
                  type: "OtherProcess",
                  name: "OtherProcess",
                  meta: JSON.stringify({ position: pos }),
                });
              },
            },
            {
              id: "add-database",
              content: "database",
              tooltipText: "database",
              onClickFunction: (event) => {
                const pos = event.position || event.cyPosition;
                this.emitAddNode({
                  type: "DataBase",
                  name: "DataBase",
                  meta: JSON.stringify({ position: pos }),
                });
              },
            },
            {
              id: "add-multidocument",
              content: "multi document",
              tooltipText: "multi document",
              onClickFunction: (event) => {
                const pos = event.position || event.cyPosition;
                this.emitAddNode({
                  type: "MultiDocument",
                  name: "MultiDocument",
                  meta: JSON.stringify({ position: pos }),
                });
              },
            },
          ],
        },
        {
          id: "select-all-nodes",
          content: "select all nodes",
          selector: "node",
          coreAsWell: true,
          show: true,
          onClickFunction: function (event) {
            selectAllOfTheSameType("node");

            contextMenu.hideMenuItem("select-all-nodes");
            contextMenu.showMenuItem("unselect-all-nodes");
          },
        },
        {
          id: "unselect-all-nodes",
          content: "unselect all nodes",
          selector: "node",
          coreAsWell: true,
          show: false,
          onClickFunction: function (event) {
            unselectAllOfTheSameType("node");

            contextMenu.showMenuItem("select-all-nodes");
            contextMenu.hideMenuItem("unselect-all-nodes");
          },
        },
        {
          id: "select-all-edges",
          content: "select all edges",
          selector: "edge",
          coreAsWell: true,
          show: true,
          onClickFunction: function (event) {
            selectAllOfTheSameType("edge");

            contextMenu.hideMenuItem("select-all-edges");
            contextMenu.showMenuItem("unselect-all-edges");
          },
        },
        {
          id: "unselect-all-edges",
          content: "unselect all edges",
          selector: "edge",
          coreAsWell: true,
          show: false,
          onClickFunction: function (event) {
            unselectAllOfTheSameType("edge");

            contextMenu.showMenuItem("select-all-edges");
            contextMenu.hideMenuItem("unselect-all-edges");
          },
        },
      ],
    });

    // let popper1 = this.cy.nodes()[0].popper({
    //     content: () => {
    //       let div = document.createElement('div');

    //       div.innerHTML = 'Popper content';
    //       div.style.color = "white"
    //       this.$refs.flow_container.appendChild(div);
    //       console.log("ㄴㅁㅇㄻㄴㅇㄹ")
    //       return div;
    //     },
    //     popper: {} // my popper options here
    //    });
    // var updateA = function(){
    // 		popper1.update();
    // };

    // this.cy.nodes()[0].on('position', updateA);
    // this.cy.on('pan zoom resize', updateA);
  },
  destroyed() {
    window.document.removeEventListener("keyup", this.onShortCut);
    this.handles.close();
  },
};
</script>

<style>
.side-btn {
  position: absolute;
  right: 10px;
  bottom: 10px;
  padding: 0.2em;
  border: 1px solid #555;
  min-width: 50px;
  min-height: 50px;
  text-align: center;
  border-radius: 8px;
  z-index: 1;
  cursor: pointer;
  background: #333;
  box-shadow: 0 4px 2px -3px rgba(0, 0, 0, 0.2), 0 3px 3px 0 rgba(0, 0, 0, 0.14),
    0 2px 6px 0 rgba(0, 0, 0, 0.12);
  transition: 0.3s ease all;
}

.input__on-off[type="checkbox"] {
  display: none;
}

.label__on-off {
  overflow: hidden;
  position: relative;
  display: inline-block;
  width: 29px;
  height: 14px;
  -webkit-border-radius: 13px;
  -moz-border-radius: 13px;
  border-radius: 13px;
  background-color: rgb(66, 66, 66);
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  -ms-transition: all 0.3s;
  -o-transition: all 0.3s;
  transition: all 0.3s;
}

.label__on-off > * {
  vertical-align: sub;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  -ms-transition: all 0.3s;
  -o-transition: all 0.3s;
  transition: all 0.3s;
  font-size: 7px;
}

.label__on-off .marble {
  position: absolute;
  top: 1px;
  left: 1px;
  display: block;
  width: 12px;
  height: 12px;
  background-color: #fff;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
  -webkit-box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.label__on-off .on {
  display: none;
  padding-left: 6px;
}

.label__on-off .off {
  padding-left: 15px;
  line-height: 12.5px;
}

.input__on-off:checked + .label__on-off {
  background-color: #0bba82;
}

.input__on-off:checked + .label__on-off .on {
  display: inline-block;
}

.input__on-off:checked + .label__on-off .off {
  display: none;
}

.input__on-off:checked + .label__on-off .marble {
  left: 16px;
}
</style>
