( function(){
    'use strict';

    var moment = require('moment');
    
    module.exports = function( dust ){
        dust.helpers.momentFormat = _momentFormat;
        dust.helpers.momentDurationHumanize = _momentDurationHumanize;
        dust.helpers.script = _script;
    };

    function _momentDurationHumanize( chunk, context, bodies, params ){
        var duration = params.duration || 0;
        var units = params.units || 'milliseconds';
        var humanizedDuration = moment.duration( duration, units ).humanize();
        return chunk.write( humanizedDuration );
    }

    function _momentFormat( chunk, context, bodies, params ){
        if( !params.date || !params.format ) return chunk;
        var formattedDate = moment( params.date ).format( params.format );
        return chunk.write( formattedDate );
    }
    
    function _script( chunk, context, bodies, params ){
        if( !params.filepath ) return chunk;
        var webPath = params.filepath.replace( "public/", "/" );
        var html = '<script type="text/javascript" language="javascript" src="' + webPath + '"></script>';
        return chunk.write( html );
    }
    
})();