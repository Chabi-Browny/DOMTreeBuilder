
var SimpleDOMCreator = function()
{   
    function DOMTreeBuilder( Data, MainParentElement, ParentElement, GrandParentElement )
    {
        var Target = null;
        var MainParent = null;
        var Parent = ParentElement !== undefined ? ParentElement : null;
        var GrandParent = GrandParentElement !== undefined ? GrandParentElement : null;
        
        if( MainParentElement !== undefined )
        {
            if(typeof MainParentElement === "string" )
                { MainParent = document.createElement(MainParentElement); }
            if(typeof MainParentElement === "object" )
                { MainParent = MainParentElement; }
        }

        Data.forEach(
            function(ColItem)
            {
                if( ColItem['parent'] !== undefined  )
                {//parent element exam
                    if(typeof ColItem['parent']==="string")
                        { Parent = document.createElement(ColItem['parent']); }
                    else if( typeof ColItem['parent']==="object" && ColItem['parent']['tag'] !== undefined )
                        { Parent = document.createElement(ColItem['parent']['tag']); }
                    
                    if( ColItem['parent']['attribs'] !== undefined )
                        { Parent = SettingAttributes(Parent, ColItem['parent']['attribs'] ); }
                }
                else if( ColItem['tag']!== undefined && ColItem['parent']===undefined )
                {//if it is not parent element
                    Target = document.createElement(ColItem['tag']);
                    
                    if( ColItem['attribs'] !== undefined )
                        { Target = SettingAttributes(Target, ColItem['attribs'] ); }
                }
                
                if(ColItem['childs'] !== undefined)
                {// if it has child object
                    if( ParentElement !== undefined )
                    {// it has parent
                            Target = DOMTreeBuilder( ColItem['childs'], null, Parent, Parent);
                            // then the result append to the grandparent
                            GrandParent.appendChild(Target);
                    }
                    else if( ParentElement === undefined )
                    {//if this, that is a ancestor parent
                        Target = DOMTreeBuilder( ColItem['childs'], MainParent, Parent, Parent);
                        // the result append the ancestor parent
                        MainParent.appendChild(Target);
                    }
                }
                else if( ColItem['childs'] === undefined && ColItem['parent'] === undefined )
                {//if it hasn't child, that append to the parent
                    Parent.appendChild(Target);
                }
            }
        );

        // expanded element returns
        if( ParentElement === undefined )
            { return MainParent; }
        else
        {
            if( GrandParent !== undefined )
                { return GrandParent; }
            else
                { return Parent; }
        }
    }
    
    /**/
    function SettingAttributes( Target, Attribs)
    {
        // setting up the attributes, if it has
        for(var attr in Attribs )
        {
            if(attr === 'inner')
                Target.innerHTML = Attribs[attr];
            else
                Target.setAttribute(attr, Attribs[attr]);
        }
        return Target;
    }
    
    this.TableFrame = function(ParentElement)
    {
            
        var Rows = 
        [
            {
                'parent':'thead',
                'childs':
                    [
                        {'parent':{'tag':'tr'},
                            'childs':
                            [
                                {'tag':'th', attribs:{'rowspan':'2','inner':'Col0:<span id="id-00">'+'xy'+'</span>'}},
                                {'tag':'th', attribs:{'colspan':'3','class':'sub-num-title','inner':'Col-1'}},
                                {'tag':'th', attribs:{'colspan':'3','class':'sub-num-title','inner':'Col-2'}}
                            ]},
                        {'parent':'tr',
                            'childs':
                            [
                                {'tag':'th', attribs:{'colspan':'3','inner':'zz'} },
                                {'tag':'th', attribs:{'colspan':'3','inner':'zz'} }
                            ]}
                    ]
            },
            {
                'parent':'tbody',
                'childs':
                    [
                        {
                            'parent':{tag:'tr', attribs:{class:'test', id:'testid'} },
                            'childs':
                            [
                                {'tag':'td', attribs:{'class':'rowlabel','inner':'Row-1'} },
                                {'tag':'td', attribs:{'colspan':'3', 'id':'inc-0'} },
                                {'tag':'td', attribs:{'colspan':'3', 'id':'outc-0'} }
                            ]
                        },
                        {
                            'parent':'tr',
                            'childs':
                            [
                                {'tag':'td', attribs:{'class':'rowlabel','inner':'Row-2'} },
                                {'tag':'td', attribs:{'colspan':'3', 'id':'begin-0'} },
                                {'tag':'td', attribs:{'colspan':'3'} }
                            ]
                        },
                        {
                            'parent':'tr',
                            'childs':
                            [
                                {'tag':'td', attribs:{'class':'rowlabel','inner':'Row-3'} },
                                {'tag':'td', attribs:{'colspan':'3'} },
                                {'tag':'td', attribs:{'colspan':'3', 'id':'close-0'} }
                            ]
                        },
                        {
                            'parent':'tr',
                            'childs':
                            [
                                {'tag':'td', attribs:{'class':'rowlabel','inner':'Row-4'} },
                                {'tag':'td', attribs:{'colspan':'3', 'id':'inc-1'} },
                                {'tag':'td', attribs:{'colspan':'3', 'id':'outc-1'} }
                            ]
                        },
                        {
                            'parent':'tr',
                            'childs':
                            [
                                {'tag':'td', attribs:{'colspan':'4','class':'rowlabel','inner':'Row-5'} },
                                {'tag':'td', attribs:{'colspan':'3', 'id':'close'} }
                            ]
                        },
                        {
                            'parent':'tr',
                            'childs':
                            [
                                {'tag':'td', attribs:{'colspan':'4','class':'rowlabel','inner':'Row-6'} },
                                {'tag':'td', attribs:{'colspan':'3', 'id':'over'} }
                            ]
                        },
                        {
                            'parent':'tr',
                            'childs':
                            [
                                {'tag':'td', attribs:{'colspan':'4','class':'rowlabel','inner':'Row-7'} },
                                {'tag':'td', attribs:{'colspan':'3', 'id':'loss'} }
                            ]
                        },
                        {
                            'parent':'tr',
                            'childs':
                            [
                                {
                                    'parent':{'tag':'td',attribs:{ 'colspan':'7','class':'qcell'}},
                                    'childs':
                                    [
                                        {'tag':'div', attribs:{ 'inner':'Row-box:'} },
                                        {
                                            'parent':{'tag':'div',attribs:{ 'class':'qmain'}},
                                            'childs':
                                            [
                                                {
                                                    'parent':{'tag':'div',attribs:{ 'class':'qbox'}},
                                                    'childs':
                                                    [
                                                        {'tag':'div', attribs:{'class':'dotted-line', 'id':'inc-doc'} },
                                                        {'tag':'span', attribs:{'inner':'db'} }
                                                    ]
                                                },
                                                {
                                                    'parent':{'tag':'div',attribs:{ 'class':'qbox'}},
                                                    'childs':
                                                    [
                                                        {'tag':'div', attribs:{'class':'dotted-line', 'id':'outc-doc'} },
                                                        {'tag':'span', attribs:{'inner':'db'} },
                                                    ]
                                                },
                                            ]
                                        },
                                        {
                                            'parent':{'tag':'div',attribs:{ 'class':'smain'}},
                                            'childs':
                                            [
                                                {
                                                    'parent':{'tag':'div',attribs:{ 'class':'sbox'}},
                                                    'childs':
                                                    [
                                                        {'tag':'img', attribs:{'class':'dotted-line', 'id':'sign-c0', 'src':'wd.png'} },
                                                        {'tag':'span', attribs:{'inner':'no'} },
                                                    ]
                                                },
                                                {
                                                    'parent':{'tag':'div',attribs:{ 'class':'sbox'}},
                                                    'childs':
                                                    [
                                                        {'tag':'img', attribs:{'class':'dotted-line', 'id':'sign-c1', 'src':'wd.png'} },
                                                        {'tag':'span', attribs:{'inner':'no'} }
                                                    ]
                                                },
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                    ]
            },
        ];
                
        // a tábla váza  
        var Table = document.createElement('table');
        Table.setAttribute('class','full-width w-tbl'); 
        // tábla bővítése fejrésszel        
        var Thead = DOMTreeBuilder(Rows, Table);
        
        ParentElement.appendChild( Thead ); 
        return Thead;
    };
};
    
window.onload = function ()
{
    var makeDOM = new SimpleDOMCreator();
    makeDOM.TableFrame(document.querySelector('.test'));
};