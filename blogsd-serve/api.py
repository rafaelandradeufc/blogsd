from flask import Flask
from flask_cors import CORS
from flask_restful import reqparse, abort, Api, Resource
import mysql.connector

mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  passwd="root",
  database="blogsd"
)

app = Flask(__name__)
CORS(app)
api = Api(app)


class Todo(Resource):
    def get(self, id):

	mycursor = mydb.cursor()
	sql = "SELECT * FROM noticia WHERE id = "+id;
	mycursor.execute(sql)
	myresult = mycursor.fetchone()
        return myresult

    def delete(self, id):

	mycursor = mydb.cursor()
	sql = "DELETE FROM noticia WHERE id = "+id
	myresult = mycursor.execute(sql)
	mydb.commit()
        return myresult, 204

    def put(self, id):

	parser = reqparse.RequestParser()
	parser.add_argument('id', type=int)
	parser.add_argument('autor',type=str)
	parser.add_argument('titulo',type=str)
	parser.add_argument('data',type=str)
	parser.add_argument('conteudo',type=str)
	args = parser.parse_args()

        mycursor = mydb.cursor()
	sql = "UPDATE noticia SET titulo = '"+args['titulo']+"' WHERE id = "+id
	
	mycursor.execute(sql)
	mydb.commit()

	return "",201



class TodoList(Resource):
    def get(self):

	resultFinal = [];
	mycursor = mydb.cursor()		
	mycursor.execute("SELECT * FROM noticia")		
	results = mycursor.fetchall()
	
	for r in results:
		resultFinal.append({'id': r[0],'autor': r[1],'titulo': r[2],'data': r[3],'conteudo': r[4]});
	
        return resultFinal,200

    def post(self):

	parser = reqparse.RequestParser()
	parser.add_argument('id', type=int)
	parser.add_argument('autor',type=str)
	parser.add_argument('titulo',type=str)
	parser.add_argument('data',type=str)
	parser.add_argument('conteudo',type=str)
	args = parser.parse_args()

	mycursor = mydb.cursor()
	sql = "INSERT INTO noticia (autor,titulo,data,conteudo) VALUES (%s,%s,%s,%s)"
	val = (args['autor'],args['titulo'],args['data'],args['conteudo'])
	mycursor.execute(sql, val)
	mydb.commit()
	return args,201


api.add_resource(TodoList, '/noticia')
api.add_resource(Todo, '/noticia/<id>')


if __name__ == '__main__':
    app.run(debug=True)

