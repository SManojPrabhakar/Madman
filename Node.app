
sealed class Screen(var route:String){
    object Home:Screen(route="Home")
    object Login:Screen(route="Login")
    object Register:Screen(route="Register")
    object Signin:Screen(route="signin")
}

package com.example.page

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.Button
import androidx.compose.material.Icon
import androidx.compose.material.OutlinedTextField
import androidx.compose.material.Text
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Email
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.Phone
import androidx.compose.material.icons.filled.Place
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.example.page.ui.theme.PageTheme


@Composable
fun Signin(){
    Column(modifier= Modifier
        .fillMaxSize()
        .verticalScroll(rememberScrollState()),
        verticalArrangement = Arrangement.Top, horizontalAlignment = Alignment.Start) {
        var text by remember{
            mutableStateOf("")
        }
        var text1 by remember {
            mutableStateOf("")
        }
        var text2 by remember {
            mutableStateOf("")
        }
        var text3 by remember {
            mutableStateOf("")
        }
        var text4 by remember{
            mutableStateOf("")
        }
        var text5 by remember{
            mutableStateOf("")
        }
        var text6 by remember{
            mutableStateOf("")
        }
        var text7 by remember{
            mutableStateOf("")
        }
        Text(text ="Email",modifier= Modifier.padding(start=20.dp,top=50.dp))
        OutlinedTextField(
            value = text,
            leadingIcon = { Icon(imageVector = Icons.Default.Email, contentDescription = "emailIcon") },
            onValueChange = {
                text = it
            },modifier= Modifier
                .fillMaxWidth()
                .padding(start = 10.dp, end = 10.dp),
            label = { Text(text = "Email address") },

            )
        Spacer(modifier = Modifier.height(10.dp))

        Text(text ="CollageName:",modifier= Modifier.padding(start=20.dp))
        OutlinedTextField(
            value = text1,  label = { Text(text = "Collage Name") },
            leadingIcon = { Icon(painter = painterResource(id = R.drawable.baseline_apartment_24), contentDescription = "emailIcon") },
            onValueChange = {
                text1 = it
            },modifier= Modifier
                .fillMaxWidth()
                .padding(start = 10.dp, end = 10.dp)
        )
        Spacer(modifier = Modifier.height(10.dp))
        Text(text ="Id.No:",modifier= Modifier.padding(start=20.dp))
        OutlinedTextField(
            value = text2,  label = { Text(text = "Roll No") },
            onValueChange = {
                text2 = it
            },modifier= Modifier
                .fillMaxWidth()
                .padding(start = 10.dp, end = 10.dp)
        )

        Spacer(modifier = Modifier.height(10.dp))
        Text(text ="Full Name:",modifier= Modifier.padding(start=20.dp))
        OutlinedTextField(
            value = text3,  label = { Text(text = "Name") },
            leadingIcon = { Icon(imageVector = Icons.Default.Person, contentDescription = "place") },
            onValueChange = {
                text3 = it
            },modifier= Modifier
                .fillMaxWidth()
                .padding(start = 10.dp, end = 10.dp)
        )
        Spacer(modifier = Modifier.height(10.dp))
        Text(text ="Department",modifier= Modifier.padding(start=20.dp))
        OutlinedTextField(
            value = text4,  label = { Text(text = "Dep") },

            onValueChange = {
                text4 = it
            },modifier= Modifier
                .fillMaxWidth()
                .padding(start = 10.dp, end = 10.dp)
        )
        Spacer(modifier = Modifier.height(10.dp))

        Text(text ="Number:",modifier= Modifier.padding(start=20.dp))
        OutlinedTextField(
            value = text5,  label = { Text(text = "Number") },
            keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),
            leadingIcon = { Icon(imageVector = Icons.Default.Phone, contentDescription = "place") },
            onValueChange = {
                if(text5.length==9){
                    text5 = it}
            },modifier= Modifier
                .fillMaxWidth()
                .padding(start = 10.dp, end = 10.dp)
        )
        Spacer(modifier = Modifier.height(10.dp))
        Text(text ="Desigination",modifier= Modifier.padding(start=20.dp))
        OutlinedTextField(
            value = text5,  label = { Text(text = "  Desigination") },
            keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),
            onValueChange = {
                text5 = it
            },modifier= Modifier
                .fillMaxWidth()
                .padding(start = 10.dp, end = 10.dp)
        )
        Spacer(modifier = Modifier.height(10.dp))
        Text(text ="Address",modifier= Modifier.padding(start=20.dp))
        OutlinedTextField(
            value = text5,  label = { Text(text = "Address") },
            keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),
            leadingIcon = { Icon(imageVector = Icons.Default.Place, contentDescription = "place") },
            onValueChange = {
                text5 = it
            },modifier= Modifier
                .fillMaxWidth()
                .padding(start = 10.dp, end = 10.dp)
        )
        Spacer(modifier = Modifier.height(10.dp))

        Text(text ="Password",modifier= Modifier.padding(start=20.dp))
        OutlinedTextField(
            value = text6,  label = { Text(text = "Password") },
            keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),
            leadingIcon = { Icon(painter = painterResource(id = R.drawable.baseline_visibility_off_24), contentDescription = "place") },
            onValueChange = {
                text6 = it
            },modifier= Modifier
                .fillMaxWidth()
                .padding(start = 10.dp, end = 10.dp)
        )
        Spacer(modifier = Modifier.height(10.dp))

        Text(text ="Confirm Password",modifier= Modifier.padding(start=20.dp))
        OutlinedTextField(
            value = text7,  label = { Text(text = "Re-enter") },
            keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),
            leadingIcon = { Icon(painter = painterResource(id = R.drawable.baseline_visibility_off_24), contentDescription = "place") },
            onValueChange = {
                text7 = it
            },modifier= Modifier
                .fillMaxWidth()
                .padding(start = 10.dp, end = 10.dp)
        )
        Spacer(modifier = Modifier.height(10.dp))
        Column(modifier= Modifier.fillMaxWidth(),verticalArrangement = Arrangement.Center, horizontalAlignment = Alignment.CenterHorizontally) {
            Button(onClick = {}, shape = RoundedCornerShape(10.dp)) {
                Text(text = "Submit")
            }

        }
    }

}


@Preview(showBackground = true)
@Composable
fun SigninPreview() {
    PageTheme {
        Signin()
    }
}


import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.Button
import androidx.compose.material.ButtonDefaults
import androidx.compose.material.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import androidx.navigation.NavHostController
import androidx.navigation.compose.rememberNavController
import com.example.page.ui.theme.PageTheme

@Composable
fun Home(navController: NavHostController){
    Column(modifier=Modifier.fillMaxSize(), verticalArrangement = Arrangement.Center, horizontalAlignment = Alignment.CenterHorizontally) {
        Button(onClick = {navController.navigate(route = Screen.Register.route)}, shape = RoundedCornerShape(10.dp),
            modifier = Modifier
                .fillMaxWidth()
                .padding(start = 10.dp, end = 10.dp),colors = ButtonDefaults.
            buttonColors(backgroundColor = Color.Blue)) {
            Text(text = "Register Collage", color=Color.White)
        }

        Spacer(modifier = Modifier.height(10.dp))
        Button(onClick = {navController.navigate(route = Screen.Login.route)}, shape = RoundedCornerShape(10.dp),
            modifier = Modifier
                .fillMaxWidth()
                .padding(start = 10.dp, end = 10.dp),colors = ButtonDefaults.
            buttonColors(backgroundColor = Color.Blue)) {
            Text(text = "Login", color=Color.White)
        }

        Spacer(modifier = Modifier.height(10.dp))
        Button(onClick = {navController.navigate(route = Screen.Signin.route)}, shape = RoundedCornerShape(10.dp),
            modifier = Modifier
                .fillMaxWidth()
                .padding(start = 10.dp, end = 10.dp),colors = ButtonDefaults.
            buttonColors(backgroundColor = Color.Blue)) {
            Text(text = "Sign in", color=Color.White)
        }
    }


}

@Preview(showBackground = true)
@Composable
fun HomePreview() {
    PageTheme {
        Home(navController = rememberNavController())
    }
}
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Phone
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp

import com.example.page.ui.theme.PageTheme

@Composable
fun Register(){
    Column(modifier=Modifier.fillMaxSize(), verticalArrangement = Arrangement.Center,
    ) {
        var text by remember{
            mutableStateOf("")
        }
        var text1 by remember {
            mutableStateOf("")
        }
        var text2 by remember{
            mutableStateOf("")
        }


        Text(text ="Name:",modifier=Modifier.padding(start=20.dp))
        OutlinedTextField(
            value = text,
            leadingIcon = { Icon(painter = painterResource(id = R.drawable.baseline_apartment_24), contentDescription = "emailIcon") },
            onValueChange = {
                text = it
            },modifier= Modifier
                .fillMaxWidth()
                .padding(start = 10.dp, end = 10.dp),
            label = { Text(text = "Collage name") },
        )

        Spacer(modifier = Modifier.height(10.dp))
        Text(text ="Code:",modifier=Modifier.padding(start=20.dp))
        OutlinedTextField(
            value = text1,
            onValueChange = {
                text1 = it
            },modifier= Modifier
                .fillMaxWidth()
                .padding(start = 10.dp, end = 10.dp),
            label = { Text(text = "collage code") },
        )
        Spacer(modifier = Modifier.height(10.dp))
        Text(text ="Number:",modifier=Modifier.padding(start=20.dp))
        OutlinedTextField(
            value = text2,
            leadingIcon = { Icon(imageVector = Icons.Default.Phone, contentDescription = "emailIcon") },
            onValueChange = {
                text2 = it
            },modifier= Modifier
                .fillMaxWidth()
                .padding(start = 10.dp, end = 10.dp),
            label = { Text(text = " Number") }
        )
        Spacer(modifier = Modifier.height(10.dp))
        Column(modifier=Modifier.fillMaxWidth(),verticalArrangement = Arrangement.Center, horizontalAlignment = Alignment.CenterHorizontally) {
            Button(onClick = {}, shape = RoundedCornerShape(10.dp)) {
                Text(text = "Submit")
            }

        }

    }

}



@Preview(showBackground = true)
@Composable
fun RegisterPreview() {
    PageTheme {
        Register()
    }
}
import androidx.compose.runtime.Composable
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable

@Composable
fun Setup(navcontroller:NavHostController){
    NavHost(navController = navcontroller, startDestination = Screen.Home.route ){
        composable(route = Screen.Home.route){
            Home(navcontroller)
        }
        composable(route = Screen.Register.route){
            Register()
        }
        composable(route = Screen.Login.route){
            Login()
        }
        composable(route = Screen.Signin.route){
            Signin()
        }
    }
}

