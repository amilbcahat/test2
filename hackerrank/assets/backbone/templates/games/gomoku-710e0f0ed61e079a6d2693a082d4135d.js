HR.appController.addTemplate("backbone/templates/games/gomoku",function(obj){{var __p="";Array.prototype.join}with(obj||{})__p+='<style>\n    #graph-grid {\n        margin: 20px auto;\n        border: 1px solid #666;\n        background: #fff;\n    }\n    .graph-row {\n        background-color: none;\n        border: none;\n    }\n    .graph-col {\n        height: 30px;\n        width: 30px;\n        background-color: none;\n        background: url(\'static/games/go_tile.png\');\n        border: 0px solid #000;\n        padding: 0px;\n    }\n\n    .graph-col[data-gg-y="0"][data-gg-x="0"] { background: url(\'static/games/go_tile_topleft_corner.png\'); }\n    .graph-col[data-gg-y="14"][data-gg-x="0"] { background: url(\'static/games/go_tile_bottomleft_corner.png\'); }\n    .graph-col[data-gg-y="14"][data-gg-x="14"] { background: url(\'static/games/go_tile_bottomright_corner.png\'); }\n    .graph-col[data-gg-y="0"][data-gg-x="14"] { background: url(\'static/games/go_tile_topright_corner.png\'); }\n    .graph-col[data-gg-y="0"] { background: url(\'static/games/go_tile_top_edge.png\'); }\n    .graph-col[data-gg-x="0"] { background: url(\'static/games/go_tile_left_edge.png\'); }\n    .graph-col[data-gg-y="14"] { background: url(\'static/games/go_tile_bottom_edge.png\'); }\n    .graph-col[data-gg-x="14"] { background: url(\'static/games/go_tile_right_edge.png\'); }\n\n    .graph-col div {\n        box-shadow: -3px -2px 12px 0px #333 inset;\n        min-width: 30px;\n        min-height: 30px;\n        border-radius: 15px;\n      }\n\n    .white{ background-color:white; }\n\n    .black{ background-color:#666; }\n\n</style>\n<div>\n    <div class="game-grid" style="display: block; margin: auto;">\n    </div>\n</div>\n';return __p});
//# sourceMappingURL=gomoku-5be63bb94ab12a70925fdd8513329338.js.map